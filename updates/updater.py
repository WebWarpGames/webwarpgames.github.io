# -*- coding: utf-8 -*-
import os

def main():
    # Pfad zur Datei sys.ver
    sys_ver_path = os.path.expanduser("~/console/sdisk/data/sys.ver")
    # Pfad zum Ordner updatedata
    updatedata_path = "~/console/sdisk/updatedata"

    try:
        # Oeffne die Datei sys.ver im Schreibmodus und schreibe "1.0.1" hinein
        with open(sys_ver_path, "w") as sys_ver_file:
            sys_ver_file.write("1.0.1")
        print("Text in sys.ver erfolgreich auf 1.0.1 changed.")

        # Loesche den Inhalt des Ordners updatedata
        for filename in os.listdir(updatedata_path):
            file_path = os.path.join(updatedata_path, filename)
            try:
                if os.path.isfile(file_path):
                    os.unlink(file_path)
                # Wenn es sich um ein Verzeichnis handelt, lösche den Inhalt rekursiv
                elif os.path.isdir(file_path):
                    for sub_filename in os.listdir(file_path):
                        os.unlink(os.path.join(file_path, sub_filename))
            except Exception as e:
                print(f"Fehler beim Remove vorgang von {file_path}: {e}")
        print("Inhalt von /updatedata erfolgreich deleted.")

    except Exception as e:
        print(f"Fehler: {e}")

if __name__ == "__main__":
    main()
