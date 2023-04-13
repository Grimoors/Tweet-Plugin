# Hidden Functions

def _read_h5_file(filename):
    """Reads a HDF5 file and returns a dictionary with the data"""
    import h5py
    f = h5py.File(filename, 'r')
    data = {}
    for key in f.keys():
        data[key] = f[key].value
    return data

if __name__ == "__main__":
    print "This is a module with hidden functions"
    print "It is not meant to be executed"
    print "Please run 'python main.py' instead


