const form = document.getElementById("shortener-form");
const longUrlInput = document.getElementById("longUrl");
const submitButton = document.getElementById("submit-button");
const copyButton = document.getElementById("copy-button");
const message = document.getElementById("message");
const result = document.getElementById("result");
const output = document.getElementById("short-url-output");

const parseResponsePayload = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return await response.json();
    }

    const text = await response.text();
    return text ? { message: text } : null;
};

const getErrorMessage = (response, payload) => {
    if (payload && typeof payload === "object") {
        if (typeof payload.error === "string" && payload.error.trim()) {
            return payload.error;
        }

        if (typeof payload.message === "string" && payload.message.trim()) {
            return payload.message;
        }
    }

    if (response.status === 422) {
        return "Enter a valid URL to continue.";
    }

    if (response.status >= 500) {
        return "The server failed while creating the short URL.";
    }

    return `Request failed with status ${response.status}.`;
};

const getShortUrl = (payload) => {
    if (!payload || typeof payload !== "object" || typeof payload.shortUrl !== "string") {
        throw new Error("The server returned a response without a usable short URL.");
    }

    return payload.shortUrl;
};

const setMessage = (text, type = "") => {
    message.textContent = text;
    message.className = `status-message${type ? ` ${type}` : ""}`;
};

const setPending = (pending) => {
    submitButton.disabled = pending;
    submitButton.textContent = pending ? "Working..." : "Shorten";
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const longUrl = longUrlInput.value.trim();
    if (!longUrl) {
        setMessage("Enter a valid URL to continue.", "error");
        result.hidden = true;
        return;
    }

    setPending(true);
    setMessage("Creating your short link...");
    result.hidden = true;

    try {
        const response = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ longUrl })
        });
        const payload = await parseResponsePayload(response);

        if (!response.ok) {
            throw new Error(getErrorMessage(response, payload));
        }

        const shortUrl = getShortUrl(payload);
        const shortLink = new URL(shortUrl, window.location.origin).toString();
        output.href = shortLink;
        output.textContent = shortLink;
        result.hidden = false;
        setMessage("Short link created successfully.", "success");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unexpected error while shortening the URL.";
        setMessage(errorMessage, "error");
    } finally {
        setPending(false);
    }
});

copyButton.addEventListener("click", async () => {
    const text = output.textContent?.trim();
    if (!text) {
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = "Copied";
        window.setTimeout(() => {
            copyButton.textContent = "Copy link";
        }, 1400);
    } catch {
        setMessage("Copy failed. You can still copy the link manually.", "error");
    }
});
