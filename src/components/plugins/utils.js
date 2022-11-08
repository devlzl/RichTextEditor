export function formattedFileSize(bytes) {
    if (bytes < 1024) {
        return `${bytes} bytes`
    } else if (bytes < 1024 ** 2) {
        return `${(bytes / 1024).toFixed(2)} KB`
    } else {
        return `${(bytes / (1024 ** 2)).toFixed(2)} MB`
    }
}
