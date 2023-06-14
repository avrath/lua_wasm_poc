all: main.o

main.o: main.c lua
	emcc -Ilua-5.4.4/src main.c lua-5.4.4/src/liblua.a -s WASM=1 -O2 -o main.js -s EXPORTED_FUNCTIONS="['_run_lua']" -s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']"

lua:
	cd lua-5.4.4/src && make generic CC='emcc -s WASM=1'
