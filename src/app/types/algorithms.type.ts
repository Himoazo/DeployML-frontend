export type AlgorithmInfo = {
    id?: string;  
    algorithm_name: string;
    lib_class: string;
    default_params?: Record<string, any> | null; 
    task_type: string;
    description?: string | null;
}