// Search for value in given inputs
// If value not found, return default value
export function getValueOrDefault<T>(value: T, inputs: T[], defaultValue: T) {
    // Check if value already set
    if (value != null) {
        return value;
    }

    // Get first not empty value
    for (const input of inputs) {
        if (input != null) {
            return input;
        }
    }

    // Only empty values found, return default value
    return defaultValue;
}
