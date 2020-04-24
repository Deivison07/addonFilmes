import sqlite3
banco = sqlite3.connect("streams.db")
connector = banco.cursor()
'''
sql = """CREATE TABLE stream ( imdbId TEXT, infoHash TEXT, title TEXT);"""
connector.execute(sql)
'''

imdbId = input("informe o imdbId")
hash = input("informe o info")
titulo = input("informe a titulo")

connector.execute(""" INSERT INTO stream (imdbId,infoHash,title) VALUES ('{}','{}','{}')""".format(imdbId,hash,titulo))
banco.commit()



