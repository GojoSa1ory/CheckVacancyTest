const getEnv = (key: string): string => {
    
    const value = process.env[key]

    if(value === undefined) {
        throw new Error(`Missing environment variable ${key}`)
    }

    return value
}

export const MONGO_URI = getEnv("MONGO_URI")
export const SERVER_PORT = getEnv("SERVER_PORT")