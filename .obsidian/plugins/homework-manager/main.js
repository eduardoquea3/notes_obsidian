/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => HomeworkPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/modal.ts
var import_obsidian2 = require("obsidian");

// src/suggestModal.ts
var import_obsidian = require("obsidian");
var SuggestFileModal = class extends import_obsidian.SuggestModal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }
  getSuggestions(query) {
    const files = this.app.vault.getMarkdownFiles();
    return files.filter(
      (file) => file.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  renderSuggestion(file, el) {
    var _a;
    el.createEl("div", { text: file.name });
    el.createEl("small", { text: (_a = file.parent) == null ? void 0 : _a.name });
  }
  onChooseSuggestion(file, evt) {
    this.result = file;
    this.onSubmit(this.result);
  }
};

// src/modal.ts
var HomeworkModal = class extends import_obsidian2.Modal {
  constructor(app, plugin) {
    super(app);
    const { contentEl } = this;
    this.plugin = plugin;
    this.headingClass = contentEl.createEl("div", { cls: "header" });
    this.loadClass = contentEl.createEl("div");
  }
  async onOpen() {
    const { contentEl } = this;
    await this.plugin.loadHomework();
    this.editMode = false;
    this.creating = false;
    const headingText = this.headingClass.createEl("h1", { text: "Homework", cls: "header-title" });
    const editButton = this.headingClass.createEl("div", { cls: "header-edit-button" });
    (0, import_obsidian2.setIcon)(editButton, "pencil");
    this.loadSubjects();
    editButton.addEventListener("click", (click) => {
      if (this.creating == false) {
        this.editMode = !this.editMode;
        this.loadSubjects();
        if (this.editMode) {
          (0, import_obsidian2.setIcon)(editButton, "book-open");
        } else {
          (0, import_obsidian2.setIcon)(editButton, "pencil");
        }
      } else {
        new import_obsidian2.Notice("Please complete prompt first.");
      }
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
  async loadSubjects() {
    this.loadClass.empty();
    if (this.editMode) {
      const subjectsHeading = this.loadClass.createEl("div", { cls: "subjects-heading" });
      const addSubjectButton = subjectsHeading.createEl("div", { cls: "add-subject" });
      addSubjectButton.createEl("p", { text: "Add a subject" });
      addSubjectButton.addEventListener("click", (click) => {
        if (this.creating == false) {
          let onPromptFinish = function(object) {
            const subjectText = inputText.value.trim();
            if (subjectText.length <= 32) {
              if (!object.plugin.data[subjectText]) {
                if (subjectText != "") {
                  object.plugin.data[subjectText] = {};
                } else {
                  new import_obsidian2.Notice("Subject must have a name.");
                }
              } else {
                new import_obsidian2.Notice("Cannot create duplicate subject.");
              }
            } else {
              new import_obsidian2.Notice("Must be under 32 characters.");
            }
            object.plugin.saveHomework();
            object.loadSubjects();
            object.creating = false;
            return;
          };
          this.creating = true;
          const promptClass = subjectsHeading.createEl("div", { cls: "subject-prompt" });
          promptClass.createEl("p", { text: "New subject" });
          const inputText = promptClass.createEl("input", { type: "text", cls: "subject-prompt-input" });
          inputText.focus();
          inputText.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
              onPromptFinish(this);
            }
          });
          const confirmSubject = promptClass.createEl("div", { cls: "subject-prompt-confirm" });
          (0, import_obsidian2.setIcon)(confirmSubject, "check");
          confirmSubject.addEventListener("click", (click2) => {
            onPromptFinish(this);
          });
        } else {
          new import_obsidian2.Notice("Already creating new subject.");
        }
      });
    }
    for (const subjectKey in this.plugin.data) {
      let newSubjectClass = this.loadClass.createEl("div", { cls: "subject" });
      let subjectHeading = newSubjectClass.createEl("div", { cls: "subject-heading" });
      let subjectName = subjectHeading.createEl("div", { text: subjectKey, cls: "subject-heading-name" });
      if (this.editMode) {
        let removeSubjectButton = subjectHeading.createEl("div", { cls: "subject-heading-remove" });
        (0, import_obsidian2.setIcon)(removeSubjectButton, "minus");
        subjectHeading.insertBefore(removeSubjectButton, subjectName);
        removeSubjectButton.addEventListener("click", (click) => {
          Reflect.deleteProperty(this.plugin.data, subjectKey);
          this.plugin.saveHomework();
          newSubjectClass.empty();
        });
      } else {
        let newTaskButton = subjectHeading.createEl("div", { cls: "subject-heading-add" });
        (0, import_obsidian2.setIcon)(newTaskButton, "plus");
        newTaskButton.addEventListener("click", (click) => {
          if (this.creating == false) {
            let onPromptFinish = function(object) {
              const taskText = inputText.value.trim();
              if (taskText.length <= 100) {
                if (!object.plugin.data[subjectKey][taskText]) {
                  if (taskText != "") {
                    object.plugin.data[subjectKey][taskText] = {
                      page,
                      date: dateField.value
                    };
                    object.createTask(newSubjectClass, subjectKey, taskText);
                  } else {
                    new import_obsidian2.Notice("Must have a name.");
                  }
                } else {
                  new import_obsidian2.Notice("Cannot create duplicate task.");
                }
              } else {
                new import_obsidian2.Notice("Must be under 100 characters.");
              }
              object.plugin.saveHomework();
              object.creating = false;
              promptClass.empty();
            };
            this.creating = true;
            let page = "";
            const promptClass = newSubjectClass.createEl("div", { cls: "task-prompt" });
            const flexClassTop = promptClass.createEl("div", { cls: "task-prompt-flextop" });
            const inputText = flexClassTop.createEl("input", { type: "text", cls: "task-prompt-flextop-input" });
            const confirmTask = flexClassTop.createEl("div", { cls: "task-prompt-flextop-confirm" });
            (0, import_obsidian2.setIcon)(confirmTask, "check");
            inputText.focus();
            const flexClassBottom = promptClass.createEl("div", { cls: "task-prompt-flexbottom" });
            const suggestButton = flexClassBottom.createEl("div", { text: "File", cls: "task-prompt-flexbottom-suggest" });
            const dateField = flexClassBottom.createEl("input", { type: "date", cls: "task-prompt-flexbottom-date" });
            suggestButton.addEventListener("click", (click2) => {
              new SuggestFileModal(this.app, (result) => {
                page = result.path;
                suggestButton.setText(result.name);
              }).open();
            });
            inputText.addEventListener("keydown", (event) => {
              if (event.key == "Enter") {
                onPromptFinish(this);
              }
            });
            confirmTask.addEventListener("click", (click2) => {
              onPromptFinish(this);
            });
          } else {
            new import_obsidian2.Notice("Already creating task.");
          }
        });
      }
      if (!this.editMode) {
        for (const taskKey in this.plugin.data[subjectKey]) {
          this.createTask(newSubjectClass, subjectKey, `${taskKey}`);
        }
      }
    }
  }
  createTask(subjectClass, subjectKey, taskName) {
    let taskClass = subjectClass.createEl("div", { cls: "task" });
    let taskButton = taskClass.createEl("div", { cls: "task-check" });
    let filePath = this.plugin.data[subjectKey][taskName].page;
    let taskText;
    if (filePath == "") {
      taskText = taskClass.createEl("div", { text: taskName, cls: "task-text", parent: taskButton });
    } else {
      taskText = taskClass.createEl("div", { text: taskName, cls: "task-link", parent: taskButton });
    }
    let dateValue = this.plugin.data[subjectKey][taskName].date;
    if (dateValue != "") {
      let date = new Date(this.plugin.data[subjectKey][taskName].date);
      var dateArr = date.toDateString().split(" ");
      var dateFormat = dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
      let taskDate = taskClass.createEl("div", { text: dateFormat, cls: "task-date", parent: taskText });
      if (new Date() > date && new Date().toDateString() != date.toDateString()) {
        taskDate.style.color = "var(--text-error)";
      }
    }
    taskText.addEventListener("click", (click) => {
      if (filePath != "") {
        let file = this.app.vault.getAbstractFileByPath(filePath);
        if (file instanceof import_obsidian2.TFile) {
          this.app.workspace.getLeaf().openFile(file);
          this.close();
        }
      }
    });
    taskButton.addEventListener("click", (click) => {
      Reflect.deleteProperty(this.plugin.data[subjectKey], taskName);
      this.plugin.saveHomework();
      taskClass.empty();
    });
  }
};

// src/main.ts
var HomeworkPlugin = class extends import_obsidian3.Plugin {
  async onload() {
    const ribbonToggle = this.addRibbonIcon("book", "Open homework", (evt) => {
      new HomeworkModal(this.app, this).open();
    });
    ribbonToggle.addClass("my-plugin-ribbon-class");
    this.addCommand({
      id: "open-homework",
      name: "Open homework",
      callback: () => {
        new HomeworkModal(this.app, this).open();
      }
    });
  }
  async loadHomework() {
    this.data = Object.assign({}, await this.loadData());
  }
  async saveHomework() {
    await this.saveData(this.data);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL21vZGFsLnRzIiwgInNyYy9zdWdnZXN0TW9kYWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbmltcG9ydCBIb21ld29ya01vZGFsIGZyb20gJy4vbW9kYWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21ld29ya1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XHJcblx0ZGF0YTogYW55O1xyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHQvLyBPcGVuIGhvbWV3b3JrIHJpYmJvbiBidXR0b25cclxuXHRcdGNvbnN0IHJpYmJvblRvZ2dsZSA9IHRoaXMuYWRkUmliYm9uSWNvbignYm9vaycsICdPcGVuIGhvbWV3b3JrJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xyXG5cdFx0XHRuZXcgSG9tZXdvcmtNb2RhbCh0aGlzLmFwcCwgdGhpcykub3BlbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gUGVyZm9ybSBhZGRpdGlvbmFsIHRoaW5ncyB3aXRoIHRoZSByaWJib25cclxuXHRcdHJpYmJvblRvZ2dsZS5hZGRDbGFzcygnbXktcGx1Z2luLXJpYmJvbi1jbGFzcycpO1xyXG5cclxuXHRcdC8vIE9wZW4gaG9tZXdvcmsgY29tbWFuZFxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdvcGVuLWhvbWV3b3JrJyxcclxuXHRcdFx0bmFtZTogJ09wZW4gaG9tZXdvcmsnLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xyXG5cdFx0XHRcdG5ldyBIb21ld29ya01vZGFsKHRoaXMuYXBwLCB0aGlzKS5vcGVuKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZEhvbWV3b3JrKCkge1xyXG5cdFx0dGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuXHR9XHJcblx0XHJcblx0YXN5bmMgc2F2ZUhvbWV3b3JrKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLmRhdGEpO1xyXG5cdH1cclxufSIsICJpbXBvcnQgSG9tZXdvcmtQbHVnaW4gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0IHsgQXBwLCBNb2RhbCwgVEZpbGUsIE5vdGljZSwgc2V0SWNvbiB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgU3VnZ2VzdEZpbGVNb2RhbCB9IGZyb20gJy4vc3VnZ2VzdE1vZGFsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWV3b3JrTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcblx0cGx1Z2luOiBIb21ld29ya1BsdWdpbjtcclxuICAgIGhlYWRpbmdDbGFzczogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBsb2FkQ2xhc3M6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZWRpdE1vZGU6IEJvb2xlYW47XHJcbiAgICBjcmVhdGluZzogQm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogSG9tZXdvcmtQbHVnaW4pIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcclxuXHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuICAgICAgICB0aGlzLmhlYWRpbmdDbGFzcyA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJoZWFkZXJcIiB9KTtcclxuICAgICAgICB0aGlzLmxvYWRDbGFzcyA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImRpdlwiKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIG9uT3BlbigpIHtcclxuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4ubG9hZEhvbWV3b3JrKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNyZWF0aW5nID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3QgaGVhZGluZ1RleHQgPSB0aGlzLmhlYWRpbmdDbGFzcy5jcmVhdGVFbChcImgxXCIsIHsgdGV4dDogXCJIb21ld29ya1wiLCBjbHM6IFwiaGVhZGVyLXRpdGxlXCIgfSk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IHRoaXMuaGVhZGluZ0NsYXNzLmNyZWF0ZUVsKFwiZGl2XCIsIHtjbHM6IFwiaGVhZGVyLWVkaXQtYnV0dG9uXCIgfSk7XHJcbiAgICAgICAgc2V0SWNvbihlZGl0QnV0dG9uLCBcInBlbmNpbFwiKTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZFN1YmplY3RzKCk7XHJcblxyXG4gICAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jcmVhdGluZyA9PSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9ICF0aGlzLmVkaXRNb2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU3ViamVjdHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEljb24oZWRpdEJ1dHRvbiwgXCJib29rLW9wZW5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJY29uKGVkaXRCdXR0b24sIFwicGVuY2lsXCIpO1xyXG4gICAgICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlBsZWFzZSBjb21wbGV0ZSBwcm9tcHQgZmlyc3QuXCIpO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXHJcblx0b25DbG9zZSgpIHsgICBcclxuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcclxuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xyXG5cdH1cclxuXHJcbiAgICBhc3luYyBsb2FkU3ViamVjdHMoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZENsYXNzLmVtcHR5KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVkaXRNb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YmplY3RzSGVhZGluZyA9IHRoaXMubG9hZENsYXNzLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcInN1YmplY3RzLWhlYWRpbmdcIiB9KTtcclxuICAgICAgICAgICAgY29uc3QgYWRkU3ViamVjdEJ1dHRvbiA9IHN1YmplY3RzSGVhZGluZy5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJhZGQtc3ViamVjdFwiIH0pO1xyXG4gICAgICAgICAgICBhZGRTdWJqZWN0QnV0dG9uLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IFwiQWRkIGEgc3ViamVjdFwiIH0pO1xyXG5cclxuICAgICAgICAgICAgYWRkU3ViamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jcmVhdGluZyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9tcHRDbGFzcyA9IHN1YmplY3RzSGVhZGluZy5jcmVhdGVFbChcImRpdlwiLCB7Y2xzOiBcInN1YmplY3QtcHJvbXB0XCJ9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0Q2xhc3MuY3JlYXRlRWwoXCJwXCIsIHt0ZXh0OiBcIk5ldyBzdWJqZWN0XCJ9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXRUZXh0ID0gcHJvbXB0Q2xhc3MuY3JlYXRlRWwoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIGNsczogXCJzdWJqZWN0LXByb21wdC1pbnB1dFwifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRUZXh0LmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0RmluaXNoKG9iamVjdCA6IEhvbWV3b3JrTW9kYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViamVjdFRleHQgPSBpbnB1dFRleHQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YmplY3RUZXh0Lmxlbmd0aCA8PSAzMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmplY3QucGx1Z2luLmRhdGFbc3ViamVjdFRleHRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YmplY3RUZXh0ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnBsdWdpbi5kYXRhW3N1YmplY3RUZXh0XSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJTdWJqZWN0IG11c3QgaGF2ZSBhIG5hbWUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJDYW5ub3QgY3JlYXRlIGR1cGxpY2F0ZSBzdWJqZWN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiTXVzdCBiZSB1bmRlciAzMiBjaGFyYWN0ZXJzLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnBsdWdpbi5zYXZlSG9tZXdvcmsoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubG9hZFN1YmplY3RzKCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmNyZWF0aW5nID0gZmFsc2U7ICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFRleHQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09ICdFbnRlcicpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Qcm9tcHRGaW5pc2godGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlybVN1YmplY3QgPSBwcm9tcHRDbGFzcy5jcmVhdGVFbChcImRpdlwiLCB7Y2xzOiBcInN1YmplY3QtcHJvbXB0LWNvbmZpcm1cIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEljb24oY29uZmlybVN1YmplY3QsIFwiY2hlY2tcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1TdWJqZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoY2xpY2spID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Qcm9tcHRGaW5pc2godGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiQWxyZWFkeSBjcmVhdGluZyBuZXcgc3ViamVjdC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChjb25zdCBzdWJqZWN0S2V5IGluIHRoaXMucGx1Z2luLmRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG5ld1N1YmplY3RDbGFzcyA9IHRoaXMubG9hZENsYXNzLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcInN1YmplY3RcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWJqZWN0SGVhZGluZyA9IG5ld1N1YmplY3RDbGFzcy5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJzdWJqZWN0LWhlYWRpbmdcIiB9KTtcclxuICAgICAgICAgICAgbGV0IHN1YmplY3ROYW1lID0gc3ViamVjdEhlYWRpbmcuY3JlYXRlRWwoXCJkaXZcIiwge3RleHQ6IHN1YmplY3RLZXksIGNsczogXCJzdWJqZWN0LWhlYWRpbmctbmFtZVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZW1vdmVTdWJqZWN0QnV0dG9uID0gc3ViamVjdEhlYWRpbmcuY3JlYXRlRWwoXCJkaXZcIiwge2NsczogXCJzdWJqZWN0LWhlYWRpbmctcmVtb3ZlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXRJY29uKHJlbW92ZVN1YmplY3RCdXR0b24sIFwibWludXNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ViamVjdEhlYWRpbmcuaW5zZXJ0QmVmb3JlKHJlbW92ZVN1YmplY3RCdXR0b24sIHN1YmplY3ROYW1lKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU3ViamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0aGlzLnBsdWdpbi5kYXRhLCBzdWJqZWN0S2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlSG9tZXdvcmsoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U3ViamVjdENsYXNzLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdUYXNrQnV0dG9uID0gc3ViamVjdEhlYWRpbmcuY3JlYXRlRWwoXCJkaXZcIiwge2NsczogXCJzdWJqZWN0LWhlYWRpbmctYWRkXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXRJY29uKG5ld1Rhc2tCdXR0b24sIFwicGx1c1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXdUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoY2xpY2spID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jcmVhdGluZyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYWdlID0gXCJcIjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb21wdENsYXNzID0gbmV3U3ViamVjdENsYXNzLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcInRhc2stcHJvbXB0XCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmbGV4Q2xhc3NUb3AgPSBwcm9tcHRDbGFzcy5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJ0YXNrLXByb21wdC1mbGV4dG9wXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0VGV4dCA9IGZsZXhDbGFzc1RvcC5jcmVhdGVFbChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgY2xzOiBcInRhc2stcHJvbXB0LWZsZXh0b3AtaW5wdXRcIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25maXJtVGFzayA9IGZsZXhDbGFzc1RvcC5jcmVhdGVFbChcImRpdlwiLCB7Y2xzOiBcInRhc2stcHJvbXB0LWZsZXh0b3AtY29uZmlybVwifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEljb24oY29uZmlybVRhc2ssIFwiY2hlY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0VGV4dC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmxleENsYXNzQm90dG9tID0gcHJvbXB0Q2xhc3MuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidGFzay1wcm9tcHQtZmxleGJvdHRvbVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0QnV0dG9uID0gZmxleENsYXNzQm90dG9tLmNyZWF0ZUVsKFwiZGl2XCIsIHt0ZXh0OiBcIkZpbGVcIiwgY2xzOiBcInRhc2stcHJvbXB0LWZsZXhib3R0b20tc3VnZ2VzdFwifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVGaWVsZCA9IGZsZXhDbGFzc0JvdHRvbS5jcmVhdGVFbChcImlucHV0XCIsIHt0eXBlOiBcImRhdGVcIiwgY2xzOiBcInRhc2stcHJvbXB0LWZsZXhib3R0b20tZGF0ZVwifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoY2xpY2spID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTdWdnZXN0RmlsZU1vZGFsKHRoaXMuYXBwLCAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSA9IHJlc3VsdC5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RCdXR0b24uc2V0VGV4dChyZXN1bHQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRGaW5pc2gob2JqZWN0IDogSG9tZXdvcmtNb2RhbCkgeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrVGV4dCA9IGlucHV0VGV4dC52YWx1ZS50cmltKCk7ICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFza1RleHQubGVuZ3RoIDw9IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0LnBsdWdpbi5kYXRhW3N1YmplY3RLZXldW3Rhc2tUZXh0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFza1RleHQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnBsdWdpbi5kYXRhW3N1YmplY3RLZXldW3Rhc2tUZXh0XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlIDogcGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlIDogZGF0ZUZpZWxkLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5jcmVhdGVUYXNrKG5ld1N1YmplY3RDbGFzcywgc3ViamVjdEtleSwgdGFza1RleHQpOyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiTXVzdCBoYXZlIGEgbmFtZS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIkNhbm5vdCBjcmVhdGUgZHVwbGljYXRlIHRhc2suXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIk11c3QgYmUgdW5kZXIgMTAwIGNoYXJhY3RlcnMuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnBsdWdpbi5zYXZlSG9tZXdvcmsoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5jcmVhdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdENsYXNzLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0VGV4dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09ICdFbnRlcicpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJvbXB0RmluaXNoKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1UYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoY2xpY2spID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJvbXB0RmluaXNoKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJBbHJlYWR5IGNyZWF0aW5nIHRhc2suXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGFza0tleSBpbiB0aGlzLnBsdWdpbi5kYXRhW3N1YmplY3RLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUYXNrKG5ld1N1YmplY3RDbGFzcywgc3ViamVjdEtleSwgYCR7dGFza0tleX1gKVxyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUYXNrKHN1YmplY3RDbGFzcyA6IEhUTUxEaXZFbGVtZW50LCBzdWJqZWN0S2V5IDogc3RyaW5nLCB0YXNrTmFtZSA6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB0YXNrQ2xhc3MgPSBzdWJqZWN0Q2xhc3MuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidGFza1wiIH0pO1xyXG5cdFx0XHJcblx0XHRsZXQgdGFza0J1dHRvbiA9IHRhc2tDbGFzcy5jcmVhdGVFbChcImRpdlwiLCB7Y2xzOiBcInRhc2stY2hlY2tcIiB9KTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVQYXRoID0gdGhpcy5wbHVnaW4uZGF0YVtzdWJqZWN0S2V5XVt0YXNrTmFtZV0ucGFnZTtcclxuXHJcbiAgICAgICAgbGV0IHRhc2tUZXh0O1xyXG5cclxuICAgICAgICBpZiAoZmlsZVBhdGggPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0YXNrVGV4dCA9IHRhc2tDbGFzcy5jcmVhdGVFbChcImRpdlwiLCB7IHRleHQ6IHRhc2tOYW1lLCBjbHM6IFwidGFzay10ZXh0XCIsIHBhcmVudDogdGFza0J1dHRvbn0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGFza1RleHQgPSB0YXNrQ2xhc3MuY3JlYXRlRWwoXCJkaXZcIiwgeyB0ZXh0OiB0YXNrTmFtZSwgY2xzOiBcInRhc2stbGlua1wiLCBwYXJlbnQ6IHRhc2tCdXR0b259KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRlVmFsdWUgPSB0aGlzLnBsdWdpbi5kYXRhW3N1YmplY3RLZXldW3Rhc2tOYW1lXS5kYXRlO1xyXG5cclxuICAgICAgICBpZiAoZGF0ZVZhbHVlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLnBsdWdpbi5kYXRhW3N1YmplY3RLZXldW3Rhc2tOYW1lXS5kYXRlKTtcclxuICAgICAgICAgICAgdmFyIGRhdGVBcnIgPSBkYXRlLnRvRGF0ZVN0cmluZygpLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIHZhciBkYXRlRm9ybWF0ID0gZGF0ZUFyclsyXSArICcgJyArIGRhdGVBcnJbMV0gKyAnICcgKyBkYXRlQXJyWzNdO1xyXG4gICAgICAgICAgICBsZXQgdGFza0RhdGUgPSB0YXNrQ2xhc3MuY3JlYXRlRWwoXCJkaXZcIiwgeyB0ZXh0OiBkYXRlRm9ybWF0LCBjbHM6IFwidGFzay1kYXRlXCIsIHBhcmVudDogdGFza1RleHQgfSk7ICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkgPiBkYXRlICYmIG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkgIT0gZGF0ZS50b0RhdGVTdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgdGFza0RhdGUuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtZXJyb3IpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhc2tUZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoY2xpY2sgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlsZVBhdGggIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoKS5vcGVuRmlsZShmaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcblx0XHRcclxuXHRcdHRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT4ge1xyXG4gICAgICAgICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRoaXMucGx1Z2luLmRhdGFbc3ViamVjdEtleV0sIHRhc2tOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZUhvbWV3b3JrKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0YXNrQ2xhc3MuZW1wdHkoKTtcclxuXHRcdH0pO1xyXG4gICAgfVxyXG59XHJcbiIsICJpbXBvcnQgeyBBcHAsIFN1Z2dlc3RNb2RhbCwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWdnZXN0RmlsZU1vZGFsIGV4dGVuZHMgU3VnZ2VzdE1vZGFsPFRGaWxlPiB7XHJcbiAgICByZXN1bHQ6IFRGaWxlO1xyXG4gICAgb25TdWJtaXQ6IChyZXN1bHQ6IFRGaWxlKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBvblN1Ym1pdDogKHJlc3VsdDogVEZpbGUpID0+IHZvaWQpIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG4gICAgICAgIHRoaXMub25TdWJtaXQgPSBvblN1Ym1pdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWdnZXN0aW9ucyhxdWVyeTogc3RyaW5nKTogVEZpbGVbXSB7XHJcbiAgICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmaWxlcy5maWx0ZXIoKGZpbGUpID0+XHJcbiAgICAgICAgICAgIGZpbGUubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdWdnZXN0aW9uKGZpbGU6IFRGaWxlLCBlbDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBlbC5jcmVhdGVFbChcImRpdlwiLCB7IHRleHQ6IGZpbGUubmFtZSB9KTtcclxuICAgICAgICBlbC5jcmVhdGVFbChcInNtYWxsXCIsIHsgdGV4dDogZmlsZS5wYXJlbnQ/Lm5hbWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaG9vc2VTdWdnZXN0aW9uKGZpbGU6IFRGaWxlLCBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQgPSBmaWxlO1xyXG4gICAgICAgIHRoaXMub25TdWJtaXQodGhpcy5yZXN1bHQpO1xyXG4gICAgfVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLG1CQUF1Qjs7O0FDQ3ZCLElBQUFDLG1CQUFtRDs7O0FDRG5ELHNCQUF5QztBQUVsQyxJQUFNLG1CQUFOLGNBQStCLDZCQUFvQjtBQUFBLEVBSXRELFlBQVksS0FBVSxVQUFtQztBQUNyRCxVQUFNLEdBQUc7QUFDVCxTQUFLLFdBQVc7QUFBQSxFQUNwQjtBQUFBLEVBRUEsZUFBZSxPQUF3QjtBQUNuQyxVQUFNLFFBQVEsS0FBSyxJQUFJLE1BQU0saUJBQWlCO0FBRTlDLFdBQU8sTUFBTTtBQUFBLE1BQU8sQ0FBQyxTQUNqQixLQUFLLEtBQUssWUFBWSxFQUFFLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQSxFQUVBLGlCQUFpQixNQUFhLElBQWlCO0FBbkJuRDtBQW9CUSxPQUFHLFNBQVMsT0FBTyxFQUFFLE1BQU0sS0FBSyxLQUFLLENBQUM7QUFDdEMsT0FBRyxTQUFTLFNBQVMsRUFBRSxPQUFNLFVBQUssV0FBTCxtQkFBYSxLQUFLLENBQUM7QUFBQSxFQUNwRDtBQUFBLEVBRUEsbUJBQW1CLE1BQWEsS0FBaUM7QUFDN0QsU0FBSyxTQUFT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Y0FBNEMsd0JBQU87QUFBQSxFQUdsRCxNQUFNLFNBQVM7QUFFZCxVQUFNLGVBQWUsS0FBSyxjQUFjLFFBQVEsaUJBQWlCLENBQUMsUUFBb0I7QUFDckYsVUFBSSxjQUFjLEtBQUssS0FBSyxJQUFJLEVBQUUsS0FBSztBQUFBLElBQ3hDLENBQUM7QUFHRCxpQkFBYSxTQUFTLHdCQUF3QjtBQUc5QyxTQUFLLFdBQVc7QUFBQSxNQUNmLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTTtBQUNmLFlBQUksY0FBYyxLQUFLLEtBQUssSUFBSSxFQUFFLEtBQUs7QUFBQSxNQUN4QztBQUFBLElBQ0QsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNwQixTQUFLLE9BQU8sT0FBTyxPQUFPLENBQUMsR0FBRyxNQUFNLEtBQUssU0FBUyxDQUFDO0FBQUEsRUFDcEQ7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNwQixVQUFNLEtBQUssU0FBUyxLQUFLLElBQUk7QUFBQSxFQUM5QjtBQUNEOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImNsaWNrIl0KfQo=
