from meza import io
import os


def extract_words_from_mdb_file(mdb_file):
    words = {}
    datas = io.read(mdb_file)
    while True:
        try:
            data = next(datas)
            if not data:
                break
            words[int(data['ID'])] = "|".join([data['ID'], data["단어"], data["뜻"]])
        except Exception:
            break
    return words


def write_file_from_words(words, output_file="words_output.txt"):
    with open(output_file, "w") as f:
        for i in range(2000):
            f.write(words[i+1])
            f.write(os.linesep)

    return output_file


def main():
    words = extract_words_from_mdb_file('words2018.mdb')
    print(words)
    write_file_from_words(words, 'words_all.txt')


if __name__ == "__main__":
    main()