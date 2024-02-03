export interface TodoItem {
    id: string;         // Unique identifier for each todo
    title: string;      // Title of the todo
    completed: boolean; // Completion status of the todo
  }

  export interface InputFieldProps {
    onSubmit: (value:string) => void; // callback prop to send value to parent
  }