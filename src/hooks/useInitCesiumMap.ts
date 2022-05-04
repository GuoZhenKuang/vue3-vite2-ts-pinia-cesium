/*
 * @Author: 阿匡
 * @Date: 2022-05-04 18:00:30
 * @LastEditTime: 2022-05-04 22:58:53
 * @LastEditors: 阿匡
 * @Description: 初始化加载cesium
 * @FilePath: \03vue3-vite-pinia-cesium\src\hooks\useInitCesiumMap.ts
 * 仅为学习使用
 */
import { Viewer,Entity,Cartesian3,Cesium3DTileset,IonResource,Cesium3DTileStyle,GeoJsonDataSource,defined,Color,ClassificationType,JulianDate,BoundingSphere,Ellipsoid,HorizontalOrigin,VerticalOrigin,DistanceDisplayCondition } from "cesium"; //引入cesium

export const initCesium =(contianerName:string)=>{
const viewer = new Viewer(contianerName,{
    infoBox: false,
})
viewer.camera.setView({
    destination:new Cartesian3(1332761,-4662399,4137888),
    orientation:{
        heading:0.60,
        pitch:-0.66,
        roll:0
    }
})
let city = new Cesium3DTileset({url:IonResource.fromAssetId(3839)})
viewer.scene.primitives.add(city)

//定义3d样式
let heightStyle = new Cesium3DTileStyle({
    color:{
        //条件判断具体的颜色
        conditions:[
            ['${height}>=300','rgba(45,0,75,1)'],
            ['${height}>=200','rgba(102,71,151,0.5)'],
            ['${height}>=100','rgba(170,162,204,0.5)'],
            ['${height}>=50','rgba(224,226,238,0.5)'],
            ['${height}>=25','rgba(252,230,200,0.5)'],
            ['${height}>=10','rgba(248,176,87,0.5)'],
            ['${height}>=5','rgba(198,106,11,0.5)'],
            ['true','rgb(127,59,75,8)'],
        ]
    }
})
city.style = heightStyle
// 从 GeoJson 文件加载邻域边界
let neighborhoodsPromise = GeoJsonDataSource.load('/assets/SampleData/sampleNeighborhoods.geojson',{
    clampToGround:true
})
neighborhoodsPromise.then((dataSource)=>{
    //将新数据作为实体添加到查看器
    viewer.dataSources.add(dataSource)
    // console.log('我是dataSource',dataSource)

    //得到所有实体的数组
    let neighborhoodEntities = dataSource.entities.values
    for(let i =0;i<neighborhoodEntities.length;i++){
        let entity:Entity = neighborhoodEntities[i]

        if(defined(entity.polygon)){
            //使用kml neighborhood作为实体的名称
            (entity as any).name = (entity as any).properties.neighborhood;
            // 设置几何体材料给随机透明的颜色
            (entity as any).polygon.material= Color.fromRandom({
                red:0.1,
                maximumGreen:0.5,
                minimumBlue:0.5,
                alpha:0.6
            });
            //告诉多边形为地形着色。
            //ClassificationType.CESIUM_3D_TILE 将为3D图块集着色
            //而ClassificationType.BOTH 将3d图块和地形着色（BOTH 是默认值）
            (entity as any).polygon.classificationType = ClassificationType.TERRAIN;
            // 生成多边形中心
            let polyPositions = (entity as any).polygon.hierarchy.getValue(JulianDate.now()).positions;
            // 得到范围边界求的中心
            let polyCenter = BoundingSphere.fromPoints(polyPositions).center
            // 椭球体
            polyCenter = Ellipsoid.WGS84.scaleToGeocentricSurface(polyCenter);
            (entity as any).position = polyCenter;
            // 生成标签
            (entity as any).label = {
                text:entity.name,
                showBackground:true,
                scale:0.6,
                horizontalOrigin:HorizontalOrigin.CENTER,
                verticalOrigin:VerticalOrigin.BOTTOM,
                distanceDisplayCondition:new DistanceDisplayCondition(10.0,8000.0),
                disableDepthTestDistance:100.0
            }

        }
    }
})
return viewer
}