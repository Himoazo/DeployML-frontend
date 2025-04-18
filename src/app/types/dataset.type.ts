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
  };
  