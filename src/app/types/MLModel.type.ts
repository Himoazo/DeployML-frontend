export type TrainRequest = {
    dataset_id: string;
    model_type: string;
    name_of_model: string;
  }

export type TrainedModel = {
  id: string; 
  user_id: string; 
  dataset_id: string; 
  algorithm_id: string; 
  model_name: string;
  metric: string | null;
  score: number | null;
  model_path: string;
  filename: string;
  created_at: string; 
  dataset_name: string;
  algorithm_name: string;
}