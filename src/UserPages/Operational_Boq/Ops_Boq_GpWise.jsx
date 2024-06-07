import React, { useState } from 'react'
import useGetAllProjectsForAdmin from '../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin';
import SearchInput from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import { userId, role } from '../../CommonUtitlites/Others/commonExportVariable';
export default function Ops_Boq_GpWise() {
  const [data, setData] = useState(
   [
    {
     "indexCode": 1.01,
     "description": "Survey-All the works including Hydrological survey, topographical survey, Design charges including preparation and approval of DPR",
     "unit": "LS",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 2.02,
     "description": "DC\/RC Drilling including Hiring Transportaion , Erection , Dismantling with Loading and unloading of Rig and assosiated T&P complete  in all respect including required all material labour & T&P etc-DC\/RC Drilling up to 100 Mtr.-450 MMØ",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 2.03,
     "description": "DC\/RC Drilling including Hiring Transportaion , Erection , Dismantling with Loading and unloading of Rig and assosiated T&P complete  in all respect including required all material labour & T&P etc-DC\/RC Drilling up to 100 Mtr.-500 MMØ",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 2.06,
     "description": "DC\/RC Drilling including Hiring Transportaion , Erection , Dismantling with Loading and unloading of Rig and assosiated T&P complete  in all respect including required all material labour & T&P etc.-DC\/RC Drilling from 101 Mtr. To 200 Mtr.-450 MMØ",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.02,
     "description": "Tubwell Assembly:-MSERW plain pipe As per IS 4270-150 MMØ",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.03,
     "description": "Tubwell Assembly:-MSERW plain pipe As per IS 4270-200 MMØ",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.06,
     "description": "Tubwell Assembly:-MSERW Pipe slotted pipe as per IS 8110-150 MMØ",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.1,
     "description": "Tubwell Assembly:-MS Ring-150 mm ø MS. Ring made by 150 mm x 12 mm Flat",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.11,
     "description": "Tubwell Assembly:-MS Ring-200 mm ø MS. Ring made by 150 mm x 12 mm Flat",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.15,
     "description": "Tubwell Assembly:-MS Bail plug As per IS 2800-200 mm ø M.S. Bail Plug",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.18,
     "description": "Tubwell Assembly:-Reducer-200 x 150 mm Reducer",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.24,
     "description": "Tubwell Assembly:-MSSI Clamp- As per IS 2800-200 mm ø MS S.I. Clamp",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.28,
     "description": "Tubwell Assembly:-TW Assy Support-200 mm ø Tubewell Assembly Support",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.32,
     "description": "Tubwell Assembly:-MS Well Cap-200 mm ø MS Well Cap",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 3.34,
     "description": "Tubwell Assembly:-Centre Guide-Center guide for 150mm øTW Assembly",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 4.02,
     "description": "Lowering of above Tubewell assembly including Carting upto site and welding of parts complete in all respect with all required material T&P labour etc.-Lowering up to 100 Mtr. Deep-150 MMØ MSERW Plane\/Slotted Pipe",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 4.03,
     "description": "Lowering of above Tubewell assembly including Carting upto site and welding of parts complete in all respect with all required material T&P labour etc.-Lowering up to 100 Mtr. Deep-200 MMØ MSERW Plane\/Slotted Pipe",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 4.06,
     "description": "Lowering of above Tubewell assembly including Carting upto site and welding of parts complete in all respect with all required material T&P labour etc.-Lowering from 101 Mtr. To 200 Mtr. Deep-150 MMØ MSERW Plane\/Slotted Pipe",
     "unit": "Mtr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 4.17,
     "description": "Lowering of above Tubewell assembly including Carting upto site and welding of parts complete in all respect with all required material T&P labour etc.-Logging of Borehole by Electric logging",
     "unit": "Job",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 5,
     "description": "Supplying and unconsolidated packing of gravel with suitable size",
     "unit": "Cum",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 6.03,
     "description": "Charges for Development of Tube well including transportation, dismantling of compressor-350 PSI Compressor per hour",
     "unit": "Hr.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 6.06,
     "description": "Charges for Development of Tube well including transportation, dismantling of compressor-Charges for Development of TW by 1 cusec OP Unit",
     "unit": "Hr.","qty":0,
     "rate":0

    },
    {
     "indexCode": 7.03,
     "description": "SITC of Energy efficiant AC Submmercible Pumping plant  with submercible flat cable of suitable length , main Piping & Valves with 08 nos Column Pipes , Distance piece for Rising Main and Bypas side ,NRV cum Pump and Column Pipe Jointer, Power wiring, Chemical earthing , Painting, wiring of pump house (internal & External ) and Installation Job of Pumping Plant complete in all respect with all required material, T&P labour complete in all respect for following duties in Solar Powered Applications-12.5 HP",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 9,
     "description": "SITC of Energy efficiant AC Submmercible Pumping plant including Soft Starter with submercible flat cable of suitable length , main Piping & Valves with 8 Nos Column Pipes ,  Distance piece for Rising Main and Bypas side ,NRV cum Pump and Column Pipe Jointer, Power wiring, Chemical earthing , Painting, wiring of pump house (internal & External ) and Installation Job of Pumping Plant complete in all respect with all required material,  T&P labour etc for following duties in Grid Powered Applications-Pressure Transmitter",
     "unit": "Nos.","qty":0,
     "rate":0
    },
    {
     "indexCode": 10.01,
     "description": "Electrically operated D.I. Sluice Valve Metal seated PN 1.0 dia 100 mm",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 11,
     "description": "Providing and installation hydrostatic level sensor at all tubewell pumping system including all accessories etc. complete in all respect as per instructions of Engineer -in –charge.",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 13,
     "description": "Electronic type chlorinating dosing  system(1W+1S)  with 6 LPH capacity 4kg\/cm2  working pressure with 200 Litres tank and valves pipes with all required acessories",
     "unit": "JOB",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 17,
     "description": "Internal electrificaton of water works campus.",
     "unit": "LS",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 18,
     "description": "SITC of Solar power plant (for complete plant ) including solar panals, VFD, Structure, earthing of all electrical items , Balance of system with auxillary load arrangements for Field monitoring devices , Cleaning arrangements for solar panals , Interlocking Pavement below solar panals and Installation and commisioning with civil works etc. complete in all respect with required material T&P labour",
     "unit": "KW",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 19,
     "description": "Construction of 1.3 m high and 115mm thick boundary wall with 230 mmx230 mm thick pillar made in Brick masonry in 1 cement and 4 sand mortar the spacing between two pillar should not be more than 3.0 m c\/c and the depth of foundation should not be less than 0.60m at the site of water works as per departmental type design and drawing and as per specifications given in the bid document including supply of all materials labour T&P etc.for proper completion of work as per instructions of Engineer -in - charge. (Drawing No.D-1)",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 20,
     "description": "Supply and fixing of 3.6 m x 1.20 m MS gate including fabrication and supply of steel and construction of bounary wall pillars of size 1.35mx0.23mx0.23m with ornamental brick work 115mm th. around RCC as per departmental type design and drawing (Drawing No. D-1) and as per specifications laid down in the bid document including supply of all material labourT&P etc.required for proper completion of work as per instructions of Engineer-in-charge.",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 21,
     "description": "Supply and fixing of 1.2m wide MS wicket gate including fabrication and supply of steel and construction of boundary wall pillars etc. as per specifications laid down in the bid document including supply of all material labourT&P etc.required for proper completion of work as per instructions of Engineer-in- charge.",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 22,
     "description": "Construction of Interlocking pavement for approach to water works as per departmental type design and drawing and as per specifications laid down in the bid document including supply of all materials  labour T&P etc.required for proper completion of work as per instructions of Engineer -in -charge.",
     "unit": "Sqm.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 23,
     "description": "Construction of granular sub base by providing coarse grade materials spreading in uniform layers including watering and compaction complete.",
     "unit": "Cum",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 26,
     "description": "Provision for inside square drain  including supply of all materials labour and T & P etc. complete.",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 27,
     "description": "Provide all materials labour T&P etc. complete and construct Pump house size (3.6x3.0x3.0) m Chlorinating room size (2.5x1.8x3.0)m as per departmental type design and drawing (drawing no-D-2) and as per the specifications for civil work given in the bid document including supply of all material labour and T&P etc complete as per instructions of Engineer -in - charge.",
     "unit": "Job",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 29,
     "description": "Provide all materials labour T&P etc. complete and constructed Bye-pass chamber for pump house ( 1000 (L) x 1000 (W) x 1150 (H) mm ) drawing  (drawing  no.D-3)  and as  per  the specifications for civil work given in the bid document including supply of all material labour and T&P etc complete as per instructions of Engineer -in -charge.",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 30.11,
     "description": "Supply of all materials labour T&P etc. for complete construction of R.C.C. Over Head Tank of following capacity and staging above ground level with main components including cost of soil testing and assuming bearing capacity of soil as 8 MT with supply of design and drawings.All the water retaining components of OHT shall be casted in M-30 concrete and minimum grade of concrete of foundation and staging should be M-25 with approved cement coarse sand and stone grit as per I.S. 11682 and I.S.456Seismic effects and wind load should be taken into consideration as per I.S. 1893 for earthquake resistance and I.S. 875 part-III for wind load on structure and including 1M wide RCC staircase 1 m wide R.C.C. M30 balcony M.S. ladder made of 50x50x6 mm angle section and 20mm plain M.S. bars with hand rails of 20mm medium class G.I. pipes One aluminum ladder inside the tank from top dome to bottom dome R.C.C. railing with 20mm dia medium class G.I.pipe (in 3 rows) on both sides of stair case supported on 50x50x6mm M.S. angle section spaced at intervals not more than 1.5m Proper ventilator at top dome in circular shape of 1.2 m dia Water level indicator fabricated with sensor connecting to automation Lightening conductor as per I.S.S.2309 or its latest amendments of latest electricity rules consisting of proper elevation rod with 5 or more fork points as prescribed in ISS 2309-1969 and ISS 3013-1966 C.I. manhole of min 60x60cm size with locking arrangement Supply fixing jointing of D.I.D\/F Pipes of appropriate size with D.I.D\/F specials conforming to IS 8329\/2000 as vertical pipes for inlet outlet overflow and washout as per latest \/ relevant I.S. specifications with all jointing materials for proper completion of work Construction of bed blocks in 1:2:4 PCC with cement coarse sand and approved stone grit Construction of washout \/ overflow chamber and chambers for sluice \/ butter fly valves as per departmental type design and drawing Supply of 200 mm dia PVC pipe as per I.S.- 4985\/2000 for disposal of water from overflow and washout chamber to suitable point outside the water works compound Painting of all concrete surface and steel pipe works with three coats-200 Kl 12 M Staging",
     "unit": "Job",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 31.01,
     "description": "xcavation of earth in ordinary soil (loam clay or sand) for pipe line and rising main trenches including lift upto 1.50 m and lead upto 50 m and refilling watering ramming of the excavated earth into the trench and also disposal of surplus earth upto 50m from the center of the trenches including supply of all material labour T&P etc complete as per instructions of Engineer -in -charge.-ordinary soil",
     "unit": "Cum.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 32.12,
     "description": "Supply of following sizes (D.I.) pipes for rising main\/distribution system conforming to latest\/relevant I.S. 8329\/2000 Specifications with all jointing materials such as specials conforming to latest\/relevant I.S. specifications suitable for D.I pipes as per IS-1239 \/2000 and IS 8329\/2000 or their latest amendment including F.O.R. destination and all taxes and insurance etc. with loading unloading and Carting up to site of work also including specials for these pipes and lowering them into the trenches and laying true to alignment and gradient and jointing etc. complete (including testing of pipe lines and cutting of pipes for making up the length but excluding the cost of trenches).all complete as per instructions of Engineer -in - charge.-125 mm dia K-7",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 33.01,
     "description": "Supply of following sizes pipes for distribution system conforming to latest\/ relevant I.S. 4984\/1995 Specifications with all jointing materials and specials conforming to latest \/ relevant I.S. specifications including F.O.R. destination and all taxes and insurance etc. with loading unloading and Carting up to site of work also including specials for these pipes and lowering them into the trenches and laying true to alignment and gradient and jointing etc. complete (including testing of pipe lines and cutting of pipes for making up the length but excluding the cost of trenches) all complete as per instructions of Engineer -in - charge.-90 mm dia HDPE Pipe PN-6: Class PE-100",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 33.02,
     "description": "Supply of following sizes pipes for distribution system conforming to latest\/ relevant I.S. 4984\/1995 Specifications with all jointing materials and specials conforming to latest \/ relevant I.S. specifications including F.O.R. destination and all taxes and insurance etc. with loading unloading and Carting up to site of work also including specials for these pipes and lowering them into the trenches and laying true to alignment and gradient and jointing etc. complete (including testing of pipe lines and cutting of pipes for making up the length but excluding the cost of trenches) all complete as per instructions of Engineer -in - charge.-75 mm dia HDPE Pipe PN-6: Class PE-100",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 33.03,
     "description": "Supply of following sizes pipes for distribution system conforming to latest\/ relevant I.S. 4984\/1995 Specifications with all jointing materials and specials conforming to latest \/ relevant I.S. specifications including F.O.R. destination and all taxes and insurance etc. with loading unloading and Carting up to site of work also including specials for these pipes and lowering them into the trenches and laying true to alignment and gradient and jointing etc. complete (including testing of pipe lines and cutting of pipes for making up the length but excluding the cost of trenches) all complete as per instructions of Engineer -in - charge.-63 mm dia HDPE Pipe PN-6: Class PE-100",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 33.04,
     "description": "Supply of following sizes pipes for distribution system conforming to latest\/ relevant I.S. 4984\/1995 Specifications with all jointing materials and specials conforming to latest \/ relevant I.S. specifications including F.O.R. destination and all taxes and insurance etc. with loading unloading and Carting up to site of work also including specials for these pipes and lowering them into the trenches and laying true to alignment and gradient and jointing etc. complete (including testing of pipe lines and cutting of pipes for making up the length but excluding the cost of trenches) all complete as per instructions of Engineer -in - charge.-110 mm dia HDPE Pipe PN-6: Class PE-100",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 33.05,
     "description": "Supply of following sizes pipes for distribution system conforming to latest\/ relevant I.S. 4984\/1995 Specifications with all jointing materials and specials conforming to latest \/ relevant I.S. specifications including F.O.R. destination and all taxes and insurance etc. with loading unloading and Carting up to site of work also including specials for these pipes and lowering them into the trenches and laying true to alignment and gradient and jointing etc. complete (including testing of pipe lines and cutting of pipes for making up the length but excluding the cost of trenches) all complete as per instructions of Engineer -in - charge.-125 mm dia HDPE Pipe PN-6: Class PE-100",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 33.07,
     "description": "Supply of following sizes pipes for distribution system conforming to latest\/ relevant I.S. 4984\/1995 Specifications with all jointing materials and specials conforming to latest \/ relevant I.S. specifications including F.O.R. destination and all taxes and insurance etc. with loading unloading and Carting up to site of work also including specials for these pipes and lowering them into the trenches and laying true to alignment and gradient and jointing etc. complete (including testing of pipe lines and cutting of pipes for making up the length but excluding the cost of trenches) all complete as per instructions of Engineer -in - charge.-160 mm dia HDPE Pipe PN-6: Class PE-100",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 33.08,
     "description": "Supply of following sizes pipes for distribution system conforming to latest\/ relevant I.S. 4984\/1995 Specifications with all jointing materials and specials conforming to latest \/ relevant I.S. specifications including F.O.R. destination and all taxes and insurance etc. with loading unloading and Carting up to site of work also including specials for these pipes and lowering them into the trenches and laying true to alignment and gradient and jointing etc. complete (including testing of pipe lines and cutting of pipes for making up the length but excluding the cost of trenches) all complete as per instructions of Engineer -in - charge.-180 mm dia HDPE Pipe PN-6: Class PE-100",
     "unit": "Rmt",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 34.03,
     "description": "Supply and carting up to site of work of the following dia DI butterfly \/sluice valves class I working pressure 10  Kg\/cm2 confirming to IS: 780\/1969 or its latest amendments including valve fittings & Dismantling Joints as per requirement F.O.R. destination and lowering them into the already prepared trenches fixing in position and jointing them with pipelines and testing etc. complete and also including supply of jointing materials etc. complete .including all taxes and insurance as per instructions of Engineer -in -charge.-Sluice valve - 200 mm dia",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 34.04,
     "description": "Supply and carting up to site of work of the following dia DI butterfly \/sluice valves class I working pressure 10  Kg\/cm2 confirming to IS: 780\/1969 or its latest amendments including valve fittings & Dismantling Joints as per requirement F.O.R. destination and lowering them into the already prepared trenches fixing in position and jointing them with pipelines and testing etc. complete and also including supply of jointing materials etc. complete .including all taxes and insurance as per instructions of Engineer -in -charge.-Sluice valve - 150 mm dia",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 34.05,
     "description": "Supply and carting up to site of work of the following dia DI butterfly \/sluice valves class I working pressure 10  Kg\/cm2 confirming to IS: 780\/1969 or its latest amendments including valve fittings & Dismantling Joints as per requirement F.O.R. destination and lowering them into the already prepared trenches fixing in position and jointing them with pipelines and testing etc. complete and also including supply of jointing materials etc. complete .including all taxes and insurance as per instructions of Engineer -in -charge.-Sluice valve - 125 mm dia",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 34.06,
     "description": "Supply and carting up to site of work of the following dia DI butterfly \/sluice valves class I working pressure 10  Kg\/cm2 confirming to IS: 780\/1969 or its latest amendments including valve fittings & Dismantling Joints as per requirement F.O.R. destination and lowering them into the already prepared trenches fixing in position and jointing them with pipelines and testing etc. complete and also including supply of jointing materials etc. complete .including all taxes and insurance as per instructions of Engineer -in -charge.-Sluice valve - 100 mm dia",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 34.07,
     "description": "Supply and carting up to site of work of the following dia DI butterfly \/sluice valves class I working pressure 10  Kg\/cm2 confirming to IS: 780\/1969 or its latest amendments including valve fittings & Dismantling Joints as per requirement F.O.R. destination and lowering them into the already prepared trenches fixing in position and jointing them with pipelines and testing etc. complete and also including supply of jointing materials etc. complete .including all taxes and insurance as per instructions of Engineer -in -charge.-Sluice valve - 80 mm dia",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 34.08,
     "description": "Supply and carting up to site of work of the following dia DI butterfly \/sluice valves class I working pressure 10  Kg\/cm2 confirming to IS: 780\/1969 or its latest amendments including valve fittings & Dismantling Joints as per requirement F.O.R. destination and lowering them into the already prepared trenches fixing in position and jointing them with pipelines and testing etc. complete and also including supply of jointing materials etc. complete .including all taxes and insurance as per instructions of Engineer -in -charge.-Scour valve - 80 mm dia",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 35.01,
     "description": "Pressure release valve-PRV 80 mm dia",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 35.02,
     "description": "Pressure release valve-PRV 100 mm dia",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 36.01,
     "description": "Supply and installation testing etc. of single\/double ball type air valve conforming to latest\/relevent I.S. specifications including all taxes and insurance carting up to site of work and lowering them into the trenches fixing in position and jointing them with pipelines and testing etc. complete (including supply of jointing materials and Valve fittings etc complete) as per instructions of Engineer.-20 mm",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 37,
     "description": "Supply of under ground sluice value type fire hydrant consisting of 80 mm dia sluice valve 80mm dia tail pieces 80mm dia duck foot bend and 80 mm dia standard makes iron coupling with cap and etc. complete conforming to latest\/relevent I.S. specifications including all taxes and insurance up to site of work and lowering them into the trenches fixing in position and jointing them with pipelines and testing etc. complete (including supply of jointing materials and Valve fittings etc. complete as per instructions of Engineer -in - charge.",
     "unit": "Nos.",
     "qty":0,
     "rate":0
    },
    {
     "description": "Construction of following type chambers as per department type design and drawing including Heavy duty M.S. Manhole Cover and all materials labour T&P etc complete for proper completion of work as per instructions of Engineer -in -charge.-Sluice valve chamber (masonry Type)-dia upto 200 mm - 1000 (L) x 1200 (W) x 1300 (H) mm",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 38.02,
     "description": "Construction of following type chambers as per department type design and drawing including Heavy duty M.S. Manhole Cover and all materials labour T&P etc complete for proper completion of work as per instructions of Engineer -in -charge.-Sluice valve chamber (surface box Type)",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "indexCode": 38.03,
     "description": "Construction of following type chambers as per department type design and drawing including Heavy duty M.S. Manhole Cover and all materials labour T&P etc complete for proper completion of work as per instructions of Engineer -in -charge.-Fire Hydrant chamber (750 (L) X 450 (W) X 1000 (H) mm)",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "description": "Construction of following type chambers as per department type design and drawing including Heavy duty M.S. Manhole Cover and all materials labour T&P etc complete for proper completion of work as per instructions of Engineer -in -charge.-Air Valve Chamber-350 (L) x 350 (W) x 500 (H) mm",
     "unit": "No.",
     "qty":0,
     "rate":0
    },
    {
     "description": "Construction of following type chambers as per department type design and drawing including Heavy duty M.S. Manhole Cover and all materials labour T&P etc complete for proper completion of work as per instructions of Engineer -in -charge.-Scour Valve Chamberdia upto 200 mm - 1000 (L) x 1200 (W) x 1300 (H) mm",
     "unit": "No.","qty":0,
     "rate":0
    },
    {
     "indexCode": 38.06,
     "description": "Construction of following type chambers as per department type design and drawing including Heavy duty M.S. Manhole Cover and all materials labour T&P etc complete for proper completion of work as per instructions of Engineer -in -charge.-PRV Valve Chamber - 1000 (L) x 1200 (W) x 1300 (H) mm",
     "unit": "No.","qty":0,
     "rate":0
    },
    {
     "indexCode": 39.01,
     "description": "Design and construct Thrust Block made in R.C.C. with cement coarse sand & 20 mm gauge stone ballast in proportion of 1:1.5:3 for pipe line including supply of MS reinforcement wrought to required shape as necessary its bending fixing & binding the same with 0.50 mm thick binding wire in position & necessary centering & shuttering including curing and supply of all materials labour T & P etc. required for proper completion of the work and as per specifications for RCC work as per instructions of Engineer -in -charge.-Design and construct Thrust Block made in Reinforced Cement concrete (1:1.5:3) with graded stone chips (20 mm nominal size) excluding shuttering and reinforcement as per technical requirements.",
     "unit": "Cum.","qty":0,
     "rate":0
    },
    {
     "indexCode": 39.02,
     "description": "Design and construct Thrust Block made in R.C.C. with cement coarse sand & 20 mm gauge stone ballast in proportion of 1:1.5:3 for pipe line including supply of MS reinforcement wrought to required shape as necessary its bending fixing & binding the same with 0.50 mm thick binding wire in position & necessary centering & shuttering including curing and supply of all materials labour T & P etc. required for proper completion of the work and as per specifications for RCC work as per instructions of Engineer -in -charge.-Providing reinforcement of Thrust block for reinforced concrete work including distribution bars stirrups binders etc. initial straightening and removal of loose rust (if necessary) cutting to requisite length hooking and bending to correct shape placing in proper position and binding with wire at every inter-section complete as per drawing and direction.",
     "unit": "KG","qty":0,
     "rate":0
    },
    {
     "indexCode": 43,
     "description": "Installation of suitable capacity simple T.W. automation system to control operation of the pumping plant with respect to high\/low water level in OHT and regulate Pressure with RTU panel  , 7\" HMI screen ,UPS with battery and stand for minimum 2 Hour backup , Protection device for phase Reversal for Grid powered Applications , surge device including enrgy meter inside the pump house with arrangement for communication of data with GSM and GPRS  system to show required parameters including all accessories etc. complete in all respect as per instructions of Engineer -in –charge.",
     "unit": "Job","qty":0,
     "rate":0
    },
    {
     "indexCode": 44.01,
     "description": "Dismantling and Reinstatement of the following type of road surface with old and new materials including supply of all materials labour T&P etc. required for proper completion of the work as per instructions of Engineer -in -charge.-B.O.E. surface (50% of existing bricks to be reused)",
     "unit": "sqm","qty":0,
     "rate":0
    },
    {
     "indexCode": 44.02,
     "description": "Dismantling and Reinstatement of the following type of road surface with old and new materials including supply of all materials labour T&P etc. required for proper completion of the work as per instructions of Engineer -in -charge.-Bituminous surface",
     "unit": "sqm","qty":0,
     "rate":0
    },
    {
     "indexCode": 44.04,
     "description": "Dismantling and Reinstatement of the following type of road surface with old and new materials including supply of all materials labour T&P etc. required for proper completion of the work as per instructions of Engineer -in -charge.-C.C. Road",
     "unit": "sqm","qty":0,
     "rate":0
    },
    {
     "indexCode": 45.01,
     "description": "Provision for following types of Culvert crossing along the alignment of pipe line complete as per instructions of Engineer-in-charge. (casing of pipe is done by concreting)-Nala\/Culvert Crossing ( width -3.5 m) upto Dia 300 mm",
     "unit": "Nos","qty":0,
     "rate":0
    },
    {
     "indexCode": 47.02,
     "description": "Road Crossing - Excavation in foundation of trench of proper size in soil mixed with moorum, Shingle, Kankar, soft rock, hard rock, including refilling, dressing and ramming earth or sand or bajri, ballast, including providing, supply, carting, lowering, laying and jointing of casing pipe of RCC NP-3 with appropriate size, with rubber ring joint, sand filling in gap inside RCC pipe, insertion of distribution pipe into the encasing pipe including supply of T&P, including concrete of 150 mm thick in with 40mm gauge brick ballast local sand and cement in proportion of 8:4:1, provision for barricading, labour for traffic diversion etc. Complete for proper completion of work as per instruction of Engineer.-100 mm dia. Pipe",
     "unit": "Rmt","qty":0,
     "rate":0
    },
    {
     "indexCode": 47.03,
     "description": "Road Crossing - Excavation in foundation of trench of proper size in soil mixed with moorum, Shingle, Kankar, soft rock, hard rock, including refilling, dressing and ramming earth or sand or bajri, ballast, including providing, supply, carting, lowering, laying and jointing of casing pipe of RCC NP-3 with appropriate size, with rubber ring joint, sand filling in gap inside RCC pipe, insertion of distribution pipe into the encasing pipe including supply of T&P, including concrete of 150 mm thick in with 40mm gauge brick ballast local sand and cement in proportion of 8:4:1, provision for barricading, labour for traffic diversion etc. Complete for proper completion of work as per instruction of Engineer.-150 mm dia. Pipe",
     "unit": "Rmt","qty":0,
     "rate":0
    },
    {
     "indexCode": 47.04,
     "description": "Road Crossing - Excavation in foundation of trench of proper size in soil mixed with moorum, Shingle, Kankar, soft rock, hard rock, including refilling, dressing and ramming earth or sand or bajri, ballast, including providing, supply, carting, lowering, laying and jointing of casing pipe of RCC NP-3 with appropriate size, with rubber ring joint, sand filling in gap inside RCC pipe, insertion of distribution pipe into the encasing pipe including supply of T&P, including concrete of 150 mm thick in with 40mm gauge brick ballast local sand and cement in proportion of 8:4:1, provision for barricading, labour for traffic diversion etc. Complete for proper completion of work as per instruction of Engineer.-200 mm dia. Pipe",
     "unit": "Rmt","qty":0,
     "rate":0
    },
    {
     "indexCode": 48,
     "description": "Making house connection should be done atleast 2 m inside the boundary wall with provision of tap from distribution line to outer wall of house with supply of 1 m above GL G.I. pipe (15 mm) (above ground) & average 5 mtr. MDPE Pipe (20 mm) (below ground) including specials saddle Tapetc. of suitable size T&P etc. including excavation laying and jointing for proper completion of work as per instructions of Engineer as per Dwg 12 (excluding road restoration)",
     "unit": "Nos.","qty":0,
     "rate":0
    },
    {
     "indexCode": 49,
     "description": "Construction of single tap pillar type stand post as per type design",
     "unit": "Nos.","qty":0,
     "rate":0
    },
    {
     "indexCode": 51.02,
     "description": "CE\/UL Certified Electromagnetic flow meters-100mm",
     "unit": "Nos.","qty":0,
     "rate":0
    },
    {
     "indexCode": 55.04,
     "description": "Supply and Installation of DG set for 10 years as alternate source of power excluding the cost of diesel.-20 KVA",
     "unit": "Nos.","qty":0,
     "rate":0
    },
    {
     "indexCode": 56,
     "description": "2 Sets of Stand Alone solar street light to be considered at each head works.",
     "unit": "Sets","qty":0,
     "rate":0
    },
    {
     "indexCode": 61,
     "description": "Foundation base and Shade for DG set",
     "unit": "Job","qty":0,
     "rate":0
    },
    {
     "indexCode": 63,
     "description": "4 nos battery with 200- AH capacity - 12 v",
     "unit": "Nos","qty":0,
     "rate":0
    }
   ])

   let projects = useGetAllProjectsForAdmin();
   const [projectId, setProjectId] = useState('')
   const [gps, setGps] = useState([])
   const [projectName, setProjectName] = useState('')
   const [selectedGp, setSelectedGp] = useState('')
   const [status, setStatus] = useState(false)
   const handleProjectChange = async (e) => {
     setStatus(!status)
    setSelectedGp('')
    setGps([])
      const selectedProjectId = e.target.value;
      setProjectId(selectedProjectId);
      let project = projects.find((project) => project.id === selectedProjectId);
      console.log(project)
      setGps(project.gpName)
      
      setProjectName(project.name);
     
      setSelectedGp([project.gpName[0]])
      // let response = api.post("/get-all-gps", {
      //   locationName: project.name,
      //   userId,
      //   role,
      // });
      // response = await errorHandler(response);
      // setGps(response.data.data);
    };
   const handleInputChange = (index, field, value) => {
    // Create a copy of the data array to avoid mutating state directly
    const newData = [...data];
    
    // Update the specific object in the array with the new quantity or rate
    if (!newData[index].hasOwnProperty(field)) {
      // If the field doesn't exist, add it to the object
      newData[index][field] = value;
    } else {
      // If the field exists, update its value
      newData[index][field] = value;
    }

    // Update the state with the modified array
    setData(newData);
  };
  const handleGpChange = async (data) => {
  
      setSelectedGp(data);

  };

  const handleSubmit = async() =>{
    // console.log(data)
    // return
    try {
      let result = api.post('/create-update-operational-boq-gpwise-tablewise', {userId, role, updatedTableData:data})
      result = await errorHandler(result)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>



<div className="container-fluid">
       
       <div className="mb-3">
       <label  htmlFor="projectSelect" className="form-label">
         Select Project
       </label>

       <select
         className="form-control"
         style={{width:"220px"}}
         id="projectSelect"
         onChange={handleProjectChange}
         value={projectId} // Bind the selected project's ID
       >
         <option value="">Select a Project</option>
         {projects.map((project) => (
           <option key={project.id} value={project.id}>
             {project.name}
           </option>
         ))}
       </select>
     </div>
     <SearchInput
     placeholder={"Please Select Gp"}
       title={"Select Gp"}
       items={gps}
       allClear={status}
       ResultOnClick={(data) => handleGpChange(data)}
     />
     </div>


   <table className="table table-striped table-bordered" style={{textAlign:'left'}}>
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Index Code</th>
          <th style={{width:"40rem"}}>Description</th>
          <th style={{width:"10rem"}}>Unit</th>
          <th style={{width:"30rem"}}>Qty</th>
          <th style={{width:"30rem"}}>Rate</th>
        </tr>
      </thead>
      <tbody>
        {data.map((obj, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{obj.indexCode}</td>
            <td>{obj.description}</td>
            <td>{obj.unit}</td>
            <td>
                <input
                  className='form-control'
                  placeholder='quantity'
                  onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                />
              </td>
              <td>
                <input
                  className='form-control'
                  placeholder='rate'
                  onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                />
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={()=>handleSubmit()} className='btn btn-primary'> Submit</button>
    </div>
  )
}
