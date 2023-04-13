# Hidden Functions

def _ensure_all_requirements_are_installed():

    try:
        import tensorflow as tf
    except ImportError:
        print("Tensorflow is not installed. Please install it before using this script.")
        
        print("Attempting to auto install Tensorflow...")
        import pip
        pip.main(['install', 'tensorflow'])

        try:
            import tensorflow as tf
        except ImportError:
            print("Tensorflow could not be installed. Please install it manually.")
            exit(2)

    try:
        import keras
    except ImportError:
        print("Keras is not installed. Please install it before using this script.")
        
        print("Attempting to install Keras...")
        import pip
        pip.main(['install', 'keras'])

        try:
            import keras
        except ImportError:
            print("Keras could not be installed. Please install it manually.")
            exit(2)
    
    try:
        import h5py
    except ImportError:
        print("h5py is not installed. Please install it before using this script.")
        
        print("Attempting to install h5py...")
        import pip
        pip.main(['install', 'h5py'])

        try:
            import h5py
        except ImportError:
            print("h5py could not be installed. Please install it manually.")
            exit(2)
    pass

def _read_h5_file(filename):
    """Reads a HDF5 file and returns a dictionary with the data"""
    import h5py
    f = h5py.File(filename, 'r')
    data = {}
    for key in f.keys():
        data[key] = f[key].value
    return data

def _write_h5_file(filename, data):
    """Writes a HDF5 file from a dictionary"""
    import h5py
    f = h5py.File(filename, 'w')
    for key in data.keys():
        f.create_dataset(key, data=data[key])
    f.close()

def _convert_h5_model(path, out_path, out_format, model_name):
    
    debug = 1

    if debug:
        print("Converting model: " + model_name)
        # print Model Data
        print(" Calling the _read_h5_file function to read the model data... ; Passing the following arguments: " + path + model_name)  
        print("Model Data:")
        print(_read_h5_file(path + model_name))



    pass

def _convert_model(path, out_path, format, out_format, model_name):
    # Read the model and inspect contents
    if format == "h5":
        _convert_h5_model(path, out_path, out_format, model_name)
    pass

def _convert_all_models(path, out_path, format, out_format):
    # Read names of all models in the folder of the given format and call _convert_model for each

    import os
    for filename in os.listdir(path):
        if filename.endswith("." + format):
            _convert_model(path, out_path, format, out_format, filename)
        else:
            continue

    pass

if __name__ == "__main__":

    _ensure_all_requirements_are_installed()

    print ( "This Script will convert all ML models in a folder from one format to another" )
    print ( "Please enter the path to the folder containing the models \n If left empty, will assume path to be './Input_Models/' " )
    path = input ( "Path: " )
    if path == "" :
        path = "./Input_Models/"
    print ("Input_File_Path is hence set to: " + path)

    print ( "Please enter the path to the folder where the converted models will be saved \n If left empty, will assume path to be './Output_Models/' " )
    out_path = input ( "Path: " )
    if out_path == "" :
        out_path = "./Output_Models/"
    print("Output_File_Path is hence set to: " + out_path)

    print ( "Please enter the format of the models in the input folder \n If left empty, will assume format to be 'h5' " )
    format = input ( "Format: " )
    if format == "" :
        format = "h5"
    print("Input_File_Format is hence set to: " + format)
    
    print ( "Please enter the format of the models in the output folder \n If left empty, will assume format to be 'h5' " )
    out_format = input ( "Format: " )
    if out_format == "" :
        out_format = "h5"
    print("Output_File_Format is hence set to: " + out_format)
    
    print ( "Please enter the name of the model to be converted \n If left empty, will convert all models in the folder " )
    model_name = input ( "Model Name: " )
    if model_name == "" :
        _convert_all_models(path, out_path, format, out_format)
    else:
        _convert_model(path, out_path, format, out_format, model_name)


