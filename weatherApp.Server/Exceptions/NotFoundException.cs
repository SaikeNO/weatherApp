﻿namespace weatherApp.Server.Exceptions;

public class NotFoundException(string message) : Exception(message)
{
}
