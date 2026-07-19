import os
import sqlite3

import pandas as pd


def read_csv(file_path):
    """
    Read CSV file.
    """
    try:
        return pd.read_csv(file_path)
    except Exception as e:
        raise ValueError(f"Error reading CSV file: {e}")


def read_excel(file_path):
    """
    Read Excel file.
    """
    try:
        return pd.read_excel(file_path)
    except Exception as e:
        raise ValueError(f"Error reading Excel file: {e}")


def read_json(file_path):
    """
    Read JSON file.
    """
    try:
        return pd.read_json(file_path)
    except Exception as e:
        raise ValueError(f"Error reading JSON file: {e}")


def read_xml(file_path):
    """
    Read XML file.
    """
    try:
        return pd.read_xml(file_path)
    except Exception as e:
        raise ValueError(f"Error reading XML file: {e}")


def read_parquet(file_path):
    """
    Read Parquet file.
    """
    try:
        return pd.read_parquet(file_path)
    except Exception as e:
        raise ValueError(f"Error reading Parquet file: {e}")


def read_feather(file_path):
    """
    Read Feather file.
    """
    try:
        return pd.read_feather(file_path)
    except Exception as e:
        raise ValueError(f"Error reading Feather file: {e}")


def read_pickle(file_path):
    """
    Read Pickle file.
    """
    try:
        return pd.read_pickle(file_path)
    except Exception as e:
        raise ValueError(f"Error reading Pickle file: {e}")


def read_sqlite(file_path):
    """
    Read the first table from a SQLite database.
    """
    try:
        with sqlite3.connect(file_path) as connection:

            cursor = connection.cursor()

            cursor.execute(
                "SELECT name FROM sqlite_master WHERE type='table';"
            )

            table = cursor.fetchone()

            if not table:
                raise ValueError("No tables found in SQLite database.")

            table_name = table[0]

            dataframe = pd.read_sql(
                f"SELECT * FROM {table_name}",
                connection
            )

            return dataframe

    except Exception as e:
        raise ValueError(f"Error reading SQLite database: {e}")


def read_file(file_path):
    """
    Read any supported file and return a Pandas DataFrame.
    """

    if not os.path.exists(file_path):
        raise FileNotFoundError(
            f"File not found: {file_path}"
        )

    extension = os.path.splitext(file_path)[1].lower()

    readers = {
        ".csv": read_csv,
        ".xlsx": read_excel,
        ".xls": read_excel,
        ".json": read_json,
        ".xml": read_xml,
        ".parquet": read_parquet,
        ".feather": read_feather,
        ".pkl": read_pickle,
        ".sqlite": read_sqlite,
        ".db": read_sqlite,
    }

    reader = readers.get(extension)

    if reader is None:
        raise ValueError(
            f"Unsupported file extension: {extension}"
        )

    return reader(file_path)