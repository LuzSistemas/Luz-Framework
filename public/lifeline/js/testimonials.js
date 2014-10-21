//Microsoft.Glimmer.OneWay
//<AnimationCollection FilePath="G:\myprojects\tribe2\glimmer\Glimmer\glimmerUI\glimmerUI\samples\js\banner.html.glimmer.js" xmlns="clr-namespace:GlimmerLib;assembly=GlimmerLib" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"><Animation Name="button1_click" EventType="click" Trigger="#button1"><Animation.Targets><Target Name=".slide" Duration="1000" Easing="linear" Callback="null"><Target.Effects><ModifyCSSEffect CSSName="visibility" DisplayName="ModifyCSS" MaxValue="5000" MinValue="-5000" From="0" To="hidden" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).css({1},{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="#image1" Duration="300" Easing="linear" Callback="null"><Target.Effects><ModifyCSSEffect CSSName="visibility" DisplayName="ModifyCSS" MaxValue="5000" MinValue="-5000" From="0" To="visible" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).css({1},{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /><OpacityEffect CSSName="opacity" DisplayName="Opacity Effect" MaxValue="1" MinValue="0" From="0" To="1" IsStartValue="True" IsActive="True" IsAnimatable="True" IsExpression="False" FormatString="" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="ul.buttons li" Duration="1000" Easing="linear" Callback="null"><Target.Effects><RemoveCSSClassEffect CSSName="active" DisplayName="Remove CSS Class" MaxValue="0" MinValue="0" From="0" To="0" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).removeClass({1});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="#button1" Duration="1000" Easing="linear" Callback="null"><Target.Effects><AddCSSClassEffect CSSName="active" DisplayName="Add CSS Class" MaxValue="0" MinValue="0" From="0" To="0" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).addClass({1});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /><TimerEffect CSSName="button2_click" DisplayName="Timer" MaxValue="10000" MinValue="1" From="0" To="3000" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="clearTimeout(timer);&#xD;&#xA;     timer = setTimeout(eval({1}),{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target></Animation.Targets></Animation><Animation Name="button2_click" EventType="click" Trigger="#button2"><Animation.Targets><Target Name=".slide" Duration="1000" Easing="linear" Callback="null"><Target.Effects><ModifyCSSEffect CSSName="visibility" DisplayName="ModifyCSS" MaxValue="5000" MinValue="-5000" From="0" To="hidden" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).css({1},{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="#image2" Duration="300" Easing="linear" Callback="null"><Target.Effects><ModifyCSSEffect CSSName="visibility" DisplayName="ModifyCSS" MaxValue="5000" MinValue="-5000" From="0" To="visible" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).css({1},{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /><OpacityEffect CSSName="opacity" DisplayName="Opacity Effect" MaxValue="1" MinValue="0" From="0" To="1" IsStartValue="True" IsActive="True" IsAnimatable="True" IsExpression="False" FormatString="" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="ul.buttons li" Duration="1000" Easing="linear" Callback="null"><Target.Effects><RemoveCSSClassEffect CSSName="active" DisplayName="Remove CSS Class" MaxValue="0" MinValue="0" From="0" To="0" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).removeClass({1});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="#button2" Duration="1000" Easing="linear" Callback="null"><Target.Effects><AddCSSClassEffect CSSName="active" DisplayName="Add CSS Class" MaxValue="0" MinValue="0" From="0" To="0" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).addClass({1});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /><TimerEffect CSSName="button3_click" DisplayName="Timer" MaxValue="10000" MinValue="1" From="0" To="3000" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="clearTimeout(timer);&#xD;&#xA;     timer = setTimeout(eval({1}),{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target></Animation.Targets></Animation><Animation Name="button3_click" EventType="click" Trigger="#button3"><Animation.Targets><Target Name=".slide" Duration="1000" Easing="linear" Callback="null"><Target.Effects><ModifyCSSEffect CSSName="visibility" DisplayName="ModifyCSS" MaxValue="5000" MinValue="-5000" From="0" To="hidden" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).css({1},{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="#image3" Duration="300" Easing="linear" Callback="null"><Target.Effects><ModifyCSSEffect CSSName="visibility" DisplayName="ModifyCSS" MaxValue="5000" MinValue="-5000" From="0" To="visible" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).css({1},{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /><OpacityEffect CSSName="opacity" DisplayName="Opacity Effect" MaxValue="1" MinValue="0" From="0" To="1" IsStartValue="True" IsActive="True" IsAnimatable="True" IsExpression="False" FormatString="" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="ul.buttons li" Duration="1000" Easing="linear" Callback="null"><Target.Effects><RemoveCSSClassEffect CSSName="active" DisplayName="Remove CSS Class" MaxValue="0" MinValue="0" From="0" To="0" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).removeClass({1});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target><Target Name="#button3" Duration="1000" Easing="linear" Callback="null"><Target.Effects><AddCSSClassEffect CSSName="active" DisplayName="Add CSS Class" MaxValue="0" MinValue="0" From="0" To="0" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="$({0}).addClass({1});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /><TimerEffect CSSName="button1_click" DisplayName="Timer" MaxValue="10000" MinValue="1" From="0" To="3000" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="clearTimeout(timer);&#xD;&#xA;     timer = setTimeout(eval({1}),{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target></Animation.Targets></Animation><Animation Name="OnLoad" EventType="load" Trigger="{x:Null}"><Animation.Targets><Target Name="{x:Null}" Duration="1000" Easing="linear" Callback="null"><Target.Effects><TimerEffect CSSName="button2_click" DisplayName="Timer" MaxValue="10000" MinValue="1" From="0" To="3000" IsStartValue="False" IsActive="True" IsAnimatable="False" IsExpression="False" FormatString="clearTimeout(timer);&#xD;&#xA;     timer = setTimeout(eval({1}),{2});&#xD;&#xA;" RequiresJQueryPlugin="False" JQueryPluginURI="" /></Target.Effects></Target></Animation.Targets></Animation></AnimationCollection>
jQuery(function($) {
var timer;
function button1_click(event)
{
     $(".slide").css("visibility","hidden");
     $("#image1").css("visibility","visible");
     $("#image1").css("opacity","0");
    $("#image1").animate({"opacity":1},500, "linear", null);
     $("ul.buttons li").removeClass("active");
    $("#image1").animate({"opacity":1},500, "linear", null);
     $("#button1").addClass("active");
     clearTimeout(timer);
     timer = setTimeout(eval("button2_click"),"90000");
    $("#image1").animate({"opacity":1},500, "linear", null);
}

function button2_click(event)
{
     $(".slide").css("visibility","hidden");
     $("#image2").css("visibility","visible");
     $("#image2").css("opacity","0");
    $("#image2").animate({"opacity":1},500, "linear", null);
     $("ul.buttons li").removeClass("active");
    $("#image2").animate({"opacity":1},500, "linear", null);
     $("#button2").addClass("active");
     clearTimeout(timer);
     timer = setTimeout(eval("button3_click"),"4000");
    $("#image2").animate({"opacity":1},500, "linear", null);
}

function button3_click(event)
{
     $(".slide").css("visibility","hidden");
     $("#image3").css("visibility","visible");
     $("#image3").css("opacity","0");
    $("#image3").animate({"opacity":1},500, "linear", null);
     $("ul.buttons li").removeClass("active");
    $("#image3").animate({"opacity":1},500, "linear", null);
     $("#button3").addClass("active");
     clearTimeout(timer);
     timer = setTimeout(eval("button1_click"),"4000");
    $("#image3").animate({"opacity":1},500, "linear", null);
}

function OnLoad(event)
{
     clearTimeout(timer);
     timer = setTimeout(eval("button2_click"),"4000");
}

$('#button1').bind('click', button1_click);

$('#button2').bind('click', button2_click);

$('#button3').bind('click', button3_click);

OnLoad();

});