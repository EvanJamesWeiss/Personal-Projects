$(document).ready(function() {

  $(".nav-link").on("click", function() {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
    $("main.cover").hide();
    switch ($(this).attr("id")) {
      case "navbar_home":
        $("#main_homepage").show();
        break;
      case "navbar_projects":
        $("#main_projectspage").show();
        break;
      case "navbar_about":
        $("#main_aboutpage").show();
        break;
      default:

    }
  });

});
