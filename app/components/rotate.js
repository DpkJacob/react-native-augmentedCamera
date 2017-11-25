 var newAngle=this.calcAngle(diffX,diffY);
                    if(Math.abs(newAngle-this.data.prevAngle)>10){
                        var diff;
                        if(newAngle<this.data.prevAngle){
                             diff=-(this.data.prevAngle-newAngle);
                        }
                        else if(newAngle>(90+this.data.prevAngle)){
                             diff=-(this.data.prevAngle+(180-newAngle));
                        }
                        else if(newAngle>this.data.prevAngle){
                            diff=newAngle-this.data.prevAngle;
                        }
                        else if(newAngle<(this.data.prevAngle-90)){
                            diff=newAngle+(180-this.data.prevAngle);
                        }
                        var change=this.state.angle._value+diff;
                        this.state.angle.setValue(change);
                        this.data.prevAngle=newAngle;
                    }