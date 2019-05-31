resource "aws_s3_bucket" "arbitrary_name" {
  bucket = "bookcase.kwelsch.com"
  acl    = "public-read"
  policy = "${file("policy.json")}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
