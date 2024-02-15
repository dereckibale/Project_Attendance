:: This command attempts to activate a Python virtual environment by trying different possible paths to the 'activate' script.
:: It tries the 'venv', 'virtual', and 'Virtual' directories within the 'backend' directory one by one until one succeeds.

call backend\venv\Scripts\activate || call backend\virtual\Scripts\activate || call backend\Virtual\Scripts\activate
