import sbt._

class ScalaFoursquareProject(info: ProjectInfo) extends DefaultWebProject(info) {
  override def managedStyle = ManagedStyle.Maven
  override def packageSrcJar= defaultJarPath("-sources.jar")

  val liftWebkit = "net.liftweb" %% "lift-webkit" % "2.4-M1" % "compile->default" withSources()
  val liftMapper = "net.liftweb" %% "lift-mapper" % "2.4-M1" % "compile->default"

  val liftCommon = "net.liftweb" %% "lift-common" % "2.4-M1" % "compile" withSources()
  val liftUtil = "net.liftweb" %% "lift-util" % "2.4-M1" % "compile" withSources()
  val liftJson = "net.liftweb" %% "lift-json" % "2.4-M1" % "compile" withSources()
  val scalajCollection  = "org.scalaj" %% "scalaj-collection"  % "1.1"
  val scalajHttp = "org.scalaj" %% "scalaj-http" % "0.2.8" % "compile" withSources()

  val junit = "junit" % "junit" % "4.8.2" % "test" withSources()
  val specs = "org.scala-tools.testing" %% "specs" % "1.6.5" % "test" withSources()

  val servlet = "javax.servlet" % "servlet-api" % "2.5" % "provided"
  val jetty6 = "org.mortbay.jetty" % "jetty" % "6.1.25" % "test,provided"
  val jettyutils = "org.mortbay.jetty" % "jetty-util" % "6.1.25" % "test,provided"

  val h2db = "com.h2database" % "h2" % "1.2.138"

  val bryanjswift = "Bryan J Swift Repository" at "http://repos.bryanjswift.com/maven2/"
  val junitInterface = "com.novocode" % "junit-interface" % "0.6" % "test"
  override def testFrameworks = super.testFrameworks ++ List(new TestFramework("com.novocode.junit.JUnitFrameworkNoMarker"))
}
