import os

SUPPORTED_EXTENSIONS = {
    "csv",
    "xlsx",
    "xls",
    "json",
    "xml",
    "parquet",
    "feather",
    "pkl",
    "sqlite",
    "db"
}


def validate_file(file):
    """
    Validate uploaded file.

    Returns:
        tuple: (True, "File is valid.")
        tuple: (False, "Error message")
    """

    # Check if file exists
    if file is None:
        return False, "No file uploaded."

    # Check filename
    if not file.filename:
        return False, "No file selected."

    # Get file extension
    _, extension = os.path.splitext(file.filename)
    extension = extension.lower().lstrip(".")

    # Check supported extension
    if extension not in SUPPORTED_EXTENSIONS:
        return (
            False,
            f"Unsupported file type '.{extension}'. "
            f"Supported types: {', '.join(sorted(SUPPORTED_EXTENSIONS))}"
        )

    return True, "File is valid."