import csv
import pandas as pd
import numpy as np
import networkx as nx

class RouteFinder():

    def __init__(self):

        G = nx.Graph()

        with open('data/node_pairs.csv') as csvfile:
            readCSV = csv.reader(csvfile, delimiter=',')
            for row in readCSV:
                # add edges
                G.add_edge(row[0],row[1])

        self.G = G

    def remove_node(self,nodes):

        self.G.remove_nodes_from(nodes)

    def optimal_route(self,source,target):

        return nx.shortest_path(self.G, source, target)

    def optimal_exit_route(self,source):

        exits = ['Exit_1','Exit_2','Exit_3','Exit_4']
        optimal_route = []
        shortest_path_length = 0

        for exit in exits:

            try:
                curr_path = nx.shortest_path(self.G, source, exit)
                curr_length = len(curr_path)

                if shortest_path_length == 0 or curr_length < shortest_path_length:
                    optimal_route = curr_path
                    shortest_path_length = curr_length

            except:

                msg = 'No paths found'

        if shortest_path_length == 0:
            return msg

        return optimal_route
