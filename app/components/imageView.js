import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    PanResponder,
    Animated,
    Dimensions,
    Alert,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import ViewShot from "react-native-view-shot";
import RNFetchBlob from 'react-native-fetch-blob';

export default class ImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageurl: '',
            top: 0,
            left: 0,
            size: 0,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            angle: 0,
        }
    }
    componentWillMount() {
        var par = this.props.navigation.state.params;
        this.setState({ imageurl: par.path, top: par.top, left: par.left, size: par.size, angle: par.angle });
    }
    async imageSave() {
        var value = await AsyncStorage.getItem('imageNo');
        this.refs.viewShot.capture().then((data) => {
            var fs = RNFetchBlob.fs;
            fs.isDir(fs.dirs.PictureDir + '/cameraText').
                then((dirExists) => {
                    if (!dirExists) {
                        fs.mkdir(fs.dirs.PictureDir + '/cameraText')
                            .then(() => {
                                this.writeImage(data,value);
                            })
                    }
                    else {
                        this.writeImage(data,value);
                    }
                })
        });

    };
      writeImage(data,value) {
        try {
            var fs = RNFetchBlob.fs;
            var arr=this.state.imageurl.split('/');
            var delpath=fs.dirs.DCIMDir+'/'+arr[arr.length-1];
            if (value == null) {
                fs.writeFile(fs.dirs.PictureDir+'/myApp/image0.jpg', data, 'uri')
                    .then(() => {
                        RNFetchBlob.fs.scanFile([ { path : fs.dirs.PictureDir+'/myApp/image0.jpg', mime : "image/*" } ]);
                        RNFetchBlob.fs.unlink(delpath);
                        RNFetchBlob.fs.scanFile([ { path :delpath, mime : "image/*" } ]);
                         AsyncStorage.setItem('imageNo', '0');
                         ToastAndroid.showWithGravity('Image Saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
                         this.props.navigation.goBack();
                    });

            }
            else {
                value = parseInt(value);
                ++value;
                fs.writeFile(fs.dirs.PictureDir+'/myApp/image'+value+'.jpg', data, 'uri')
                    .then(() => {
                         RNFetchBlob.fs.scanFile([ { path : fs.dirs.PictureDir+'/myApp/image'+value+'.jpg', mime : "image/*" } ]);
                         RNFetchBlob.fs.unlink(delpath);
                         RNFetchBlob.fs.scanFile([ { path :delpath, mime : "image/*" } ]);
                         AsyncStorage.setItem('imageNo', ''+value);
                         ToastAndroid.showWithGravity('Image Saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
                         this.props.navigation.goBack();
                    })
                
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (

            <View style={{ flex: 1 }}>
                <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.5, result: 'tmpfile' }}>
                    <Image source={{ uri: this.state.imageurl }} style={[{ height: this.state.height, width: this.state.width},styles.imageStyle]}>
                        <Image source={require('../images/shades.png') } style={{ height: this.state.size, width: this.state.size, left: this.state.left, top: this.state.top, transform: [{ rotate: this.state.angle }] }}  resizeMode='contain'></Image>
                    </Image>
                </ViewShot>
                <TouchableOpacity style={styles.saveBtnTouch} onPress={this.imageSave.bind(this) }>
                    <View style={styles.saveBtn}>
                        <Image source={require('../images/downloadImage.png') } style={styles.saveBtnIcon} resizeMode='contain'/>
                        <Text>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    imageStyle:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveBtnTouch:{
        position: 'absolute',
         bottom: 5,
        alignSelf: 'center' 
    },
    saveBtn:{ 
        width: 100, 
        height: 50, 
        backgroundColor: "white", 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    saveBtnIcon:{ 
        height: 20, 
        width: 30
    }
});