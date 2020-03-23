import { User } from './user';
import { Project } from './project';

export class ProjectUserRole {
    id: number;
    Project: Project;
    User: User;
}
