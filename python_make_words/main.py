from words import (
    load_words_from_file,
    write_file_from_words,
    shuffle_words
)


def main():
    for i in range(20, 60):
        chapters = [i, i+1]
        all_words = load_words_from_file("words_all.txt")

        start_index = 1 + 30 * (chapters[0] - 1)
        stop_index = 30 * chapters[1] + 1

        words = list([all_words[i] for i in range(start_index, stop_index)])
        shuffled = shuffle_words(words)
        write_file_from_words(shuffled, f"words{chapters[0]}-{chapters[1]}.txt")


if __name__ == "__main__":
    main()

