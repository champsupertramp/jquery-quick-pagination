
(function($) {
      
  $.fn.quickPagination = function(options) {
  
    var defaults = {
      pageSize: 10,
      currentPage: 1,
      holder: null,
      pagerLocation: "after",
      navigation: false,
    };
    
    var options = $.extend(defaults, options);
    
    
    return this.each(function() {
  
            
      var selector = $(this); 
      var pageCounter = 1;
      
      selector.wrap("<div class='simplePagerContainer'></div>");
      
      selector.parents(".simplePagerContainer").find("ul.simplePagerNav").remove();
      
      selector.children().each(function(i){ 
          
        if(i < pageCounter*options.pageSize && i >= (pageCounter-1)*options.pageSize) {
        $(this).addClass("simplePagerPage"+pageCounter);
        }
        else {
          $(this).addClass("simplePagerPage"+(pageCounter+1));
          pageCounter ++;
        } 
        
      });
      
      // show/hide the appropriate regions 
      selector.children().hide();
      selector.children(".simplePagerPage"+options.currentPage).show();
      
      if(pageCounter <= 1) {
        return;
      }
      
      //Build pager navigation
      var pageNav = "<ul class='simplePagerNav'>";  
          if(options.navigation){
          pageNav += "<li class='prevPage'><a class='next' rel='' href='javascript:;'>&lt;</a></li>";  
        }
      for (i=1;i<=pageCounter;i++){
        if (i==options.currentPage) {
          pageNav += "<li class='currentPage simplePageNav"+i+"'><a rel='"+i+"' href='#'>"+i+"</a></li>"; 
        }
        else {
          pageNav += "<li class='simplePageNav"+i+"'><a rel='"+i+"' href='#'>"+i+"</a></li>";
        }
      }
        if(options.navigation){
          pageNav += "<li class='nextPage'><a class='prev' rel='' href='javascript:;'>&gt;</a></li>";  
        }
      pageNav += "</ul>";
      
      if(!options.holder) {
        switch(options.pagerLocation)
        {
        case "before":
          selector.before(pageNav);
        break;
        case "both":
          selector.before(pageNav);
          selector.after(pageNav);
        break;
        default:
          selector.after(pageNav);
        }
      }
      else {
        $(options.holder).append(pageNav);
      }

      // Front / Back
      if(options.navigation){
        var nextNav = selector.parent().find(".simplePagerNav .nextPage");
        var prevNav = selector.parent().find(".simplePagerNav .prevPage");
        
        nextNav.click(function(){
            var clickedLink = options.currentPage + 1;
            if(pageCounter > options.currentPage){
              //remove current current (!) page
              $(this).parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
              //Add current page highlighting
              $(this).parent("ul").parent(".simplePagerContainer").find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
              
              selector.children().hide();     
              selector.find(".simplePagerPage"+clickedLink).show();
              options.currentPage++;
              
            }
            if(options.currentPage != pageCounter){
              nextNav.show();
            }

          
        });

        prevNav.click(function(){
          var clickedLink = options.currentPage - 1;
            if(options.currentPage <= (pageCounter + 1) && clickedLink > 0){
              //remove current current (!) page
              $(this).parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
              //Add current page highlighting
              $(this).parent("ul").parent(".simplePagerContainer").find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
              options.currentPage--;

              selector.children().hide();     
              selector.find(".simplePagerPage"+clickedLink).show();
            }

            if(options.currentPage == pageCounter ){
              nextNav.hide();
            }
        });
      }
      //pager navigation behaviour
      selector.parent().find(".simplePagerNav a:not(.next,.prev)").click(function() {
          
        //grab the REL attribute 
        var clickedLink = $(this).attr("rel");
        options.currentPage = clickedLink;
        
        if(options.holder) {
          $(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").removeClass("currentPage");
          $(this).parent("li").parent("ul").parent(options.holder).find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
        }
        else {
          //remove current current (!) page
          $(this).parent("li").parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
          //Add current page highlighting
          $(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
        }
        
        //hide and show relevant links
        selector.children().hide();     
        selector.find(".simplePagerPage"+clickedLink).show();
        
        return false;
      });
    });
  }
  

})(jQuery);

