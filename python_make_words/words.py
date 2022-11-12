import random
import os


def load_words_from_file(input_file):
    words = {}
    with open(input_file, "r") as f:
        lines = f.readlines()
    lines = list(map(str.strip, lines))

    for line in lines:
        tokens = line.split("|")
        key = int(tokens[0])
        words[key] = tokens[1] + "|" + tokens[2]

    return words


def shuffle_words(words):
    random.shuffle(words)
    return words


def write_file_from_words(words, output_file="words_output.txt"):
    with open(output_file, "w") as f:
        for line in words:
            f.write(line)
            f.write(os.linesep)

    return output_file


def rearrange_words(words):
    new_words = []
    for i in range(len(words)):
        if words[i].startswith('"'):
            new_words.append(words[i][1:] + words[i + 1][:-1])
        elif words[i].endswith('"'):
            continue
        else:
            new_words.append(words[i])
    return new_words
