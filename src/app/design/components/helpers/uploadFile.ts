export const uploadFile = async (formData: FormData): Promise<string> => {
    const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const data = await response.json();
        console.log({ data });
        const url = data.downloadURL;
        return Promise.resolve(url)
    }
    else {
        return Promise.reject()
    }
}