// import {Member} from "../member/member";
// import {string} from "prop-types";

export interface ProjectInterface {
  id: Number;
  title: string;
  // invitedMembers: Member[];
}

export class Project implements ProjectInterface {
  id: Number;
  title: string;
  // invitedMembers: Member[];

  public constructor(id, title, invitedMembers = null) {
    this.id = id;
    this.title = title;
    // this.invitedMembers = invitedMembers;
  }
}
