exports.template = (data)=>`<!doctype html>
<html>
	<head>
		${data.base}
		<title>${data.title}</title>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">

		${data.meta}

		<link href="/css/styles.css" rel="stylesheet" type="text/css">
		<script src="/js/vendor.js" type="text/javascript"></script>

		${data.link}
		${data.script}

	</head>
	<body>
		<div id="app">${data.app}</div>

		<script type="text/javascript">
			__DATA__ =${data.data};
			_token = __DATA__.token;
			_config = {};
		</script>
		<script src="/js/app.js" type="text/javascript"></script>

	</body>
</html>
`;
