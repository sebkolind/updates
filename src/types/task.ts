type Task = {
  id: string;
  identifier: string; // Human readable identifier (e.g. UPS-123)
  title: string;
  url: string;
  message?: string;
};

export type { Task };
