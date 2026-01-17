import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

FILE_TO_RUN = "temp.py"

class FileChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith(FILE_TO_RUN):
            print(f"\n🔁 Detected change in {FILE_TO_RUN}. Restarting...\n")
            os.system(f"python {FILE_TO_RUN}")

if __name__ == "__main__":
    print(f"👀 Watching for changes in {FILE_TO_RUN}...\n")
    event_handler = FileChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, ".", recursive=False)
    observer.start()

    try:
        os.system(f"python {FILE_TO_RUN}")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
