:: This command attempts to activate a Python virtual environment by trying different possible paths to the 'activate' script.
:: It tries the 'venv', 'virtual', and 'Virtual' directories within the 'backend' directory one by one until one succeeds.

call Backend\venv\Scripts\activate || call Backend\virtual\Scripts\activate || call Backend\Virtual\Scripts\activate
