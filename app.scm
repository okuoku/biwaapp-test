(define %define-invoke/async
  (js-eval
    (string-append
      "var x = function(biwas){biwas.define_libfunc(\"js-invoke/async\",2,null,function(ar){"
      "var js_obj = ar.shift(); var func_name = ar.shift();"
      "return new biwas.Pause(function(pause){"
      "var cb = function(){return pause.resume(arguments);};"
      "ar.push(cb);"
      "js_obj[func_name].apply(js_obj, ar); }); });};x")))

(js-call %define-invoke/async (js-import "biwascheme"))

(begin
 (define (object->string obj)
   (let ((p (open-output-string)))
    (write obj p)
    (get-output-string p)))
 (define the-result 0)
 (define x (js-closure (lambda (arg cb) (cb (+ arg 1)))))
 (define theWindow (js-eval "window"))
 (define theConsole (js-eval "console"))
 (js-set! theWindow "myfunc" x)
 (set! the-result (js-invoke/async theWindow "myfunc" 2))
 (set! the-result (object->string (car (js-array->list the-result))))
 the-result)

