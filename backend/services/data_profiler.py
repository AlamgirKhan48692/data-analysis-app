import pandas as pd


def profile_dataset(dataframe):
    """
    Generate a complete profile of a dataset.
    """

    rows = len(dataframe)
    columns = len(dataframe.columns)

    # Missing Values
    missing_values = dataframe.isnull().sum()

    missing_percentage = (
        (missing_values / rows) * 100
    ).round(2).to_dict() if rows > 0 else {}

    total_missing_values = int(
        missing_values.sum()
    )

    columns_with_missing = [
        column
        for column in dataframe.columns
        if dataframe[column].isnull().sum() > 0
    ]

    complete_rows = int(
        dataframe.dropna().shape[0]
    )

    # Column Types
    numerical_columns = dataframe.select_dtypes(
        include=["number"]
    ).columns.tolist()

    categorical_columns = dataframe.select_dtypes(
        include=["object", "category", "bool"]
    ).columns.tolist()

    datetime_columns = dataframe.select_dtypes(
        include=["datetime64[ns]", "datetime64"]
    ).columns.tolist()

    # Duplicate Rows
    duplicate_rows = int(
        dataframe.duplicated().sum()
    )

    # Memory Usage
    memory_usage = int(
        dataframe.memory_usage(deep=True).sum()
    )

    # Unique Values
    unique_values = {
        column: int(dataframe[column].nunique())
        for column in dataframe.columns
    }

    # Statistics
    statistics = dataframe.describe(
        include="all"
    ).fillna("").to_dict()

    # Dataset Preview (First 10 Rows)
    preview = (
        dataframe.head(10)
        .fillna("")
        .to_dict(orient="records")
    )

    # Profile
    profile = {
        "shape": {
            "rows": rows,
            "columns": columns
        },

        "column_names": dataframe.columns.tolist(),

        "data_types": dataframe.dtypes.astype(str).to_dict(),

        "numerical_columns": numerical_columns,

        "categorical_columns": categorical_columns,

        "datetime_columns": datetime_columns,

        "missing_values": missing_values.to_dict(),

        "missing_percentage": missing_percentage,

        "total_missing_values": total_missing_values,

        "columns_with_missing": columns_with_missing,

        "complete_rows": complete_rows,

        "duplicate_rows": duplicate_rows,

        "memory_usage": memory_usage,

        "unique_values": unique_values,

        "statistics": statistics,

        "preview": preview,

        "target_candidates": dataframe.columns.tolist()
    }

    return profile