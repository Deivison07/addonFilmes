import sqlite3
banco = sqlite3.connect("streams.db")
connector = banco.cursor()

def criarTabela():
    
    sql = """CREATE TABLE series (  imdbId TEXT, 
                                    infoHash TEXT,
                                    qualidade TEXT,
                                    temporada TEXT,
                                    capitulo TEXT
                                
                                );"""
    connector.execute(sql)
    

def incluirItem(imdbId,infoHash,qualidade,temporada,capitulo):

    connector.execute(""" INSERT INTO stream (imdbId,infoHash,qualidade) VALUES ('{}','{}','{}','{}','{}')""".format(imdbId,infoHash,qualidade,temporada,capitulo))
    banco.commit()



if __name__ == "__main__":
    #criarTabela()
    #incluirItem()
    pass