import { Component, OnInit } from '@angular/core';
import { CarTypeModel } from '../shared/models/CarType.model';
import { CarTypseMode } from '../shared/models/CarTypes.model';
import { CarTypeService } from '../shared/services/CarTypeService.service';

@Component({
  selector: 'app-car-type-manager-page',
  templateUrl: './car-type-manager-page.component.html',
  styleUrls: ['./car-type-manager-page.component.css']
})
export class CarTypeManagerPageComponent implements OnInit {
  LocalCarTypeManager:CarTypseMode={AllCarTypes:undefined,SingleCarType:undefined}


  //boolen members//////
  ShowCarTypeTable:boolean;
  ShwoAddSection:boolean;
  DistincBetweenAddAndEdit:boolean//true for Add false for edit
  

  ////OutPut messages members/////
  DeleteMessage:string;
  AddMessage:string;
  EditMessage:string;



  OpenAddSection():void{
    this.ShwoAddSection=true;
    this.ShowCarTypeTable=false;
    this.DistincBetweenAddAndEdit=true;
  }

  OpenEditSection(cartypeparam:CarTypeModel){
    this.LocalCarTypeManager.SingleCarType=cartypeparam;
    this.OpenAddSection();
    this.DistincBetweenAddAndEdit=false;
  }


  BackToTable():void{
    if(this.AddMessage=="new car type was created"|| this.EditMessage=="Car type was edited"|| this.DeleteMessage=="Car type was deleted"){
      this.myCarTypeService.InitCarTypes();
    }
    this.AddMessage=undefined;
    this.EditMessage=undefined;
    this.DeleteMessage=undefined;

    this.ShwoAddSection=false;
    this.ShowCarTypeTable=true;
  }


  
  //Form Members and functions///
  GearOptions:Array<string>=["Otomatic","Manual"]
  NewCarGearAsAtring:string="";
  GearChangeHanndler(event:any){
    this.NewCarGearAsAtring=event.target.value;
    this.NewCarTypeIsOtomatic=(this.NewCarGearAsAtring=="Otomatic")
  }

  NewCarTypeManufacturer:string;
  NewCarTypeModel:string;
  NewCarTypeYear:number;
  NewCarTypeIsOtomatic:boolean;
  NewCarTypePricePerDay:number;
  NewCarTypeFinePrice:number;



  AddNewCarType():void{
    //validation 
    if( (!this.NewCarTypeManufacturer) || (!this.NewCarTypeModel) || (!this.NewCarTypeYear) || 
    (this.NewCarTypeIsOtomatic==undefined)||(!this.NewCarTypePricePerDay)||(!this.NewCarTypeFinePrice)
     ){
        alert("not all data was field. please fill all the data and try again");
        return;
      }
      let NewCarType:CarTypeModel={
        Manufacturer:this.NewCarTypeManufacturer,
        Model:this.NewCarTypeModel,
        FinePrice:this.NewCarTypeFinePrice,
        CostPerDay:this.NewCarTypePricePerDay,
        Year:this.NewCarTypeYear,
        IsAutomatic:this.NewCarTypeIsOtomatic,
      };
      let callback=(bool:boolean)=>{this.AddMessage=(bool)?"new car type was created":"something went wrong";}
      this.myCarTypeService.AddNewCarType(NewCarType,callback)      
  }

  EditCarType():void{
    //save the old model
    let OldModelName:string=this.LocalCarTypeManager.SingleCarType.Model;
    this.LocalCarTypeManager.SingleCarType.Manufacturer=(this.NewCarTypeManufacturer)?this.NewCarTypeManufacturer:this.LocalCarTypeManager.SingleCarType.Manufacturer;
    this.LocalCarTypeManager.SingleCarType.Model=(this.NewCarTypeModel)?this.NewCarTypeModel:this.LocalCarTypeManager.SingleCarType.Model;
    this.LocalCarTypeManager.SingleCarType.CostPerDay=(this.NewCarTypePricePerDay)?this.NewCarTypePricePerDay:this.LocalCarTypeManager.SingleCarType.CostPerDay;
    this.LocalCarTypeManager.SingleCarType.FinePrice=(this.NewCarTypeFinePrice)?this.NewCarTypeFinePrice:this.LocalCarTypeManager.SingleCarType.FinePrice;
    this.LocalCarTypeManager.SingleCarType.IsAutomatic=(this.NewCarTypeIsOtomatic!=undefined)?this.NewCarTypeIsOtomatic:this.LocalCarTypeManager.SingleCarType.IsAutomatic

    let callback=(bool:boolean)=>{this.EditMessage=(bool)?"Car type was edited":"something went wrong";}
    this.myCarTypeService.EditCarType(OldModelName,this.LocalCarTypeManager.SingleCarType,callback);
  }



  

  ////Delete function////
  DeleteCarType(CarTypeparam:CarTypeModel){
    alert("make sure threre are no cars with the this car type")
    let callback=(bool:boolean)=>{this.DeleteMessage=(bool)?"Car type was deleted":"something went wrong";}
    this.myCarTypeService.DeleteCarType(CarTypeparam.Model,callback);  
  }




  constructor(private myCarTypeService:CarTypeService) {
    this.LocalCarTypeManager=myCarTypeService.CarTypeManager
    myCarTypeService.InitCarTypes()
    this.ShowCarTypeTable=true;
        
   }

  ngOnInit() {
  }

}
