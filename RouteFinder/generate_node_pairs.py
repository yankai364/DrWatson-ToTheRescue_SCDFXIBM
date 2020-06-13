import csv

pairs = set()

with open('data/adjacency_list.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        node = row[0]
        adjacent = row[1:]
        for adj in adjacent:
            pair = [node,adj]
            pair.sort()
            pair = tuple(pair)
            pairs.add(pair)

with open('data/node_pairs.csv','w') as csvfile:
        wr = csv.writer(csvfile,delimiter=',')
        wr.writerows(pairs)
