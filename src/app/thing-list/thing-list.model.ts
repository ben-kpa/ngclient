export class ThingList {

  public id: string;
  public creator?: number;
  public date_created?: Date;
  public date_updated?: Date;
  public name?: string;

  constructor(
    id: string,
    creator?: number,
    date_created?: Date,
    date_updated?: Date,
    name?: string,

  ) {
    this.id = id;
    this.creator = creator;
    this.date_created = date_created;
    this.date_updated = date_updated;
    this.name = name;
  }

}
