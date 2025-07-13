import DataURIParser from "datauri/parser"
import path from "path"

export const generateContent = (file: File, buffer: Buffer) => {
    const parser = new DataURIParser()
    if (!file || !buffer) {
        return false
    }

    const extName = path.extname(file.name)
    const result = parser.format(extName, buffer)

    return result.content

}