export interface ICategory {
  id: string;
  name: string;
}

export interface IUser_Simple {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  startDateTime: Date;
  finishDateTime: Date;
  cancelled: boolean;
  url: string;
  thumbnailUrl: string;
  host: IUser_Simple;
  attendees: Array<IUser_Simple>;
  category: {
    id: string;
    name: string;
  };
}

export interface IEvent_RequestBody {
  title: string;
  description: string;
  location: string;
  category: string;
  startDateTime: string;
  finishDateTime: string;
  url: string;
  thumbnailUrl: string;
}
