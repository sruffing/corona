import fs from 'fs'
import path from 'path'

const readData = (filePath) => {
    const file = path.join(process.cwd(), filePath)
    const fileContents = fs.readFileSync(file, 'utf8')
    return JSON.parse(fileContents)
}

export { readData }