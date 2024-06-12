import * as path from "path";
import fs from "fs";

const buildFolder = "dist";

const paths = {
  indexHtml: path.join(path.resolve(buildFolder), "index.html"),
  homeHtml: path.join(path.resolve(buildFolder), "home.html"),
};

export async function setNewIndexPage(cb) {
  async function deleteFolder() {
    // Удаление старого index.html
    try {
      fs.unlink(paths.indexHtml, cb);
      console.log(`Файл успешно удален: ${paths.indexHtml}`);
    } catch (err) {
      console.error(`Не удалось удалить файл: ${err}`);
      throw err;
    }
  }

  async function renameFolder() {
    // Переименование home.html в index.html
    try {
      fs.rename(paths.homeHtml, paths.indexHtml, cb);
      console.log(
        `Файл успешно переименован: ${paths.homeHtml} -> ${paths.indexHtml}`
      );
    } catch (err) {
      console.error(`Не удалось переименовать файл: ${err}`);
      throw err;
    }
  }
  async function init() {
    try {
      await deleteFolder();
      await renameFolder();
      console.log("Операции завершены успешно.");
    } catch (err) {
      console.error(`Ошибка: ${err}`);
    }
  }
  if (app.isBuildWOIndex) {
    init();
  }
}
