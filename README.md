# Startup

Start a server in ```lua_wasm_poc``` directory (for example ```python -m http.server```) and access it via browser on ```localhost```.

# Update Lua version

1. Install and configure [emscripten](https://emscripten.org/)
2. Replace the Lua directory with desired version
3. Update Lua directory path in ```makefile``` in ```lua_wasm_poc``` accordingly
4. Run ```make``` command
 
