export type Dataset = {
    file: File;
    name: string;
    target: string;
}

export type DatasetInfo = {
    id: string;
    dataset_name: string;
    feature_names: string[];
    target_column: string;
    created_at: string; 
  }
  
export type CleanRequest = {
    dataset_id: string;
    missing_values_option?: "drop" | "fill" | null; 
    drop_duplicates: boolean;
}

export type CleanResponse = {
    message: string;
    rows_after_cleaning: number;
    columns: string[];
    duplicates_removed: boolean;
    missing_values_handled: "drop" | "fill" | "none";
}
  