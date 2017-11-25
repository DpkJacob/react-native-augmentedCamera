



                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    } }
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ flex: 0, backgroundColor: '#fff', borderRadius: 5, color: '#000', padding: 10, margin: 40 }} onPress={this.takePicture.bind(this) }>[CAPTURE]</Text>
                </Camera>