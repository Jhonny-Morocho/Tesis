import { Component, OnInit } from '@angular/core';
declare var $:any,survey:any,Survey:any,window:any;
// import * as Survey  from 'survey-jquery';
 //declare var window:any,survey:any,$:any,JQuery:any;
@Component({
  selector: 'ng-app',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.cargar();

   
  }
  cargar(){
    //Survey.Survey.cssType = "bootstrap";
    //Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

    $(function() {
    Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
    window.survey = new Survey.Model({
        pages: [{
            questions: [
                {
                    type: "matrix",
                    name: "Quality",
                    title: "Indique si está de acuerdo o en desacuerdo con las siguientes afirmaciones",
                    columns: [{
                        value: 1,
                        text: "Muy en desacuerdo"
                    }, {
                        value: 2,
                        text: "Disecrepo"
                    }, {
                        value: 3,
                        text: "Neutral"
                    }, {
                        value: 4,
                        text: "Agree"
                    }, {
                        value: 5,
                        text: "Strongly Agree"
                    }],
                    rows: [{
                        value: "affordable",
                        text: "EL producto es accesible"
                    }, {
                        value: "does what it claims",
                        text: "Product does what it claims"
                    }, {
                        value: "better then others",
                        text: "Product is better than other products on the market"
                    }, {
                        value: "easy to use",
                        text: "Product is easy to use"
                    }]
                }, {
                    type: "checkbox",
                    name: "checkPreguntas",
                    title: "Selecciones las siguientes",
                    choices: [{
                        "value": "1",
                        "text": "Customer relationship"
                    }, {
                        "value": "2",
                        "text": "Service quality"
                    }, {
                        "value": "3",
                        "text": "Support response time"
                    }]
                }

            ]
        }, {
            questions: [{
                    type: "radiogroup",
                    name: "price to competitors",
                    title: "Compared to our competitors, do you feel the Product is",
                    choices: ["Less expensive", "Priced about the same", "More expensive", "Not sure"]
                }, {
                    type: "radiogroup",
                    name: "price",
                    title: "Do you feel our current price is merited by our product?",
                    choices: ["correct|Yes, the price is about right",
                        "low|No, the price is too low for your product",
                        "high|No, the price is too high for your product"
                    ]
                }, {
                    type: "multipletext",
                    name: "pricelimit",
                    title: "What is the... ",
                    items: [{
                        name: "mostamount",
                        title: "Most amount you would every pay for a product like ours"
                    }, {
                        name: "leastamount",
                        title: "The least amount you would feel comfortable paying"
                    }]
                },

            ]
        }, {
            questions: [{
                type: "text",
                name: "email",
                title: "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button."
            }]

        }, {

        }]
    });

    function selectActiveTab(survey) {
        var ulEl = document.getElementById("pages");
        if (!ulEl) return;
        var index = survey.visiblePages.indexOf(survey.currentPage);
        var lis = ulEl.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var liEl = ulEl.children[i];
            liEl.className = index == i ? "active" : "";
        }
    }

    function selectPage(survey, page) {
        survey.currentPage = page;
    }

    function createTabs(survey) {
        var ulEl = document.getElementById("pages");
        if (!ulEl) return;
        for (var i = 0; i < survey.visiblePages.length; i++) {
            let page = survey.visiblePages[i];
            var name = page.title ? page.title : "Page " + (i + 1);
            var liEl = document.createElement("li");
            var aEl = document.createElement("a");
            aEl.innerText = name;
            aEl.onclick = function() {
                selectPage(survey, page);
            };
            liEl.appendChild(aEl);
            ulEl.appendChild(liEl);

        }
        selectActiveTab(survey);
    }

    survey.onCurrentPageChanged.add(function(survey, options) {
        selectActiveTab(survey);
    });

    survey.onComplete.add(function(result) {
        document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
        console.log(result);
    });

    createTabs(survey);

    $("#surveyElement").Survey({
        model: survey
    });    
    });
 

}
}


