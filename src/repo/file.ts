import { FileModel, IFile } from "../schemas/files";
import { RepositoryBase } from "./base";

export class FileRepository extends RepositoryBase<IFile> {
  constructor() {
    super(FileModel);
  }
}
